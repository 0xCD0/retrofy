package com.retrofy.retrofy.service.gamedatabase

import com.retrofy.retrofy.jooq.tables.references.GAME_DATABASE
import com.retrofy.retrofy.jooq.tables.references.ROMS
import com.retrofy.retrofy.model.database.RomsModel
import org.apache.tomcat.util.codec.binary.Base64
import org.jooq.DSLContext
import org.jooq.impl.DSL
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Repository
import java.io.File
import java.net.URI

@Repository
class RomListService(val dsl: DSLContext) {
    val logger: Logger = LoggerFactory.getLogger(GameDatabaseService::class.java)

    fun updateRomListDatabase(system: String) {

        dsl.delete(ROMS)
            .where(ROMS.SYSTEM.eq(system))
            .execute()

        val queryBuilder = StringBuilder()
            .append("INSERT INTO roms(title, filename, filepath, `system`, thumbnail_base64, favorite, use_game_db) VALUES ")

        var idx = 0

        val fileList = File("/retrofy/roms/${system}").walkTopDown().toList()
        if (fileList.count() > 1) {
            File("/retrofy/roms/${system}").walkTopDown().toList().map {
                if (idx != 0) {
                    val databaseResult = dsl.select(DSL.asterisk())
                        .from(GAME_DATABASE)
                        .where(GAME_DATABASE.TITLE.eq(it.nameWithoutExtension))
                        .limit(1)
                        .fetchOne()

                    val base64Image =
                        if (databaseResult?.get(GAME_DATABASE.THUMBNAIL_URL) != null) getBase64EncodedImage(
                            databaseResult.get(GAME_DATABASE.THUMBNAIL_URL)!!
                        ) else ""

                    val romRelativePath = "/files/${system}/${it.name}"

                    queryBuilder
                        .append("( ")
                        .append("'${it.nameWithoutExtension.replace("'", "''")}', ")
                        .append("'${it.name.replace("'", "''")}', ")
                        .append("'${romRelativePath.replace("'", "''")}', ")
                        .append("'${system}', ")
                        .append("'${base64Image}', ")
                        .append("0, ")
                        .append("${if (databaseResult != null) 1 else 0}")
                        .append(" ),")

                    logger.info("name=${it.nameWithoutExtension} / fileName=${it.name} / path=${it.absolutePath} / relativePath=${romRelativePath}")
                }
                idx += 1
            }

            val query = queryBuilder.replaceFirst(".$".toRegex(), "")

            dsl.query(query)
                .execute()
        }
    }

    fun getRomListInfo(system: String): ArrayList<RomsModel> {
        val result = dsl.select(DSL.asterisk())
            .from(ROMS)
            .where(ROMS.SYSTEM.eq(system))
            .fetchArray()

        val resultList = ArrayList<RomsModel>()
        result.map {
            resultList.add(
                RomsModel(
                    id = it.get(ROMS.ID)!!,
                    title = it.get(ROMS.TITLE)!!,
                    fileName = it.get(ROMS.FILENAME)!!,
                    filePath = it.get(ROMS.FILEPATH)!!,
                    system = it.get(ROMS.SYSTEM)!!,
                    thumbnailBase64 = it.get(ROMS.THUMBNAIL_BASE64)!!,
                    favorite = it.get(ROMS.FAVORITE)!!,
                    useGameDb = it.get(ROMS.USE_GAME_DB)!!
                )
            )
        }
        return resultList
    }

    fun getRomInfo(system: String, title: String): RomsModel? {
        val result = dsl.select(DSL.asterisk())
            .from(ROMS)
            .where(ROMS.SYSTEM.eq(system))
            .and(ROMS.TITLE.eq(title))
            .fetchOne()

        return if (result != null) {
            RomsModel(
                id = result.get(ROMS.ID)!!,
                title = result.get(ROMS.TITLE)!!,
                fileName = result.get(ROMS.FILENAME)!!,
                filePath = result.get(ROMS.FILEPATH)!!,
                system = result.get(ROMS.SYSTEM)!!,
                thumbnailBase64 = result.get(ROMS.THUMBNAIL_BASE64)!!,
                favorite = result.get(ROMS.FAVORITE)!!,
                useGameDb = result.get(ROMS.USE_GAME_DB)!!
            )
        } else {
            null
        }
    }

    fun getBase64EncodedImage(imageURL: String): String {
        try {
            val url = imageURL.let { URI(it).toURL() }
            val inputStream = url.openStream()

            logger.info("Thumbnail Url : $url")
            return Base64.encodeBase64String(inputStream.readAllBytes())
        } catch (e: Exception) {
            return ""
        }
    }
}