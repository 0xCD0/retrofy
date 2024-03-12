package com.retrofy.retrofy.service.gamedatabase

import com.retrofy.retrofy.jooq.tables.GameDatabase.Companion.GAME_DATABASE
import com.retrofy.retrofy.model.database.GameDatabaseModel
import org.jooq.DSLContext;
import org.jooq.impl.DSL
import org.slf4j.LoggerFactory
import org.slf4j.Logger
import org.springframework.stereotype.Repository
import java.io.BufferedReader
import java.io.InputStreamReader
import java.net.URI

@Repository
class GameDatabaseService(val dsl: DSLContext) {
    val logger: Logger = LoggerFactory.getLogger(GameDatabaseService::class.java)

    fun updateDatabase(): Int {
        try {
            dsl.truncate(GAME_DATABASE)
                .execute()

            dsl.query("ALTER TABLE game_database AUTO_INCREMENT = 0")
                .execute()

            val gameDatabase = URI("https://raw.githubusercontent.com/0xCD0/retrogamedb/main/gameDatabase.csv")
                .toURL()
                .openConnection()
                .getInputStream()

            val reader = BufferedReader(InputStreamReader(gameDatabase, "UTF-8"))
            var idx = 0

            val queryBuilder = StringBuilder()
                .append("INSERT INTO game_database(title, `system`, thumbnail_url) VALUES ")

            reader.forEachLine {
                if (idx != 0) {
                    val list = it.split(";")

                    queryBuilder
                        .append("( ")
                        .append("'${list[0].replace("'", "''")}',")
                        .append("'${list[1]}',")
                        .append("'${list[2].replace("'", "''")}'")
                        .append(" ),")

                }
                idx += 1
            }

            val query = queryBuilder.replaceFirst(".$".toRegex(), "")

            dsl.query(query)
                .execute()

            return idx
        } catch (e: Exception) {
            throw e
        }
    }

    fun getById(id: Int): List<GameDatabaseModel> {
        val result = dsl.select(DSL.asterisk())
            .from(GAME_DATABASE)
            .where(GAME_DATABASE.ID.eq(1))
            .fetchInto(GameDatabaseModel::class.java)

        return result.toList()
    }

}