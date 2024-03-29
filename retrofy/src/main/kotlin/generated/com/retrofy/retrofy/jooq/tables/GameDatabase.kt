/*
 * This file is generated by jOOQ.
 */
package com.retrofy.retrofy.jooq.tables


import com.retrofy.retrofy.jooq.Retrofy
import com.retrofy.retrofy.jooq.keys.KEY_GAME_DATABASE_PRIMARY
import com.retrofy.retrofy.jooq.tables.records.GameDatabaseRecord

import org.jooq.Field
import org.jooq.ForeignKey
import org.jooq.Identity
import org.jooq.Name
import org.jooq.Record
import org.jooq.Schema
import org.jooq.Table
import org.jooq.TableField
import org.jooq.TableOptions
import org.jooq.UniqueKey
import org.jooq.impl.DSL
import org.jooq.impl.Internal
import org.jooq.impl.SQLDataType
import org.jooq.impl.TableImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class GameDatabase(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, GameDatabaseRecord>?,
    aliased: Table<GameDatabaseRecord>?,
    parameters: Array<Field<*>?>?
): TableImpl<GameDatabaseRecord>(
    alias,
    Retrofy.RETROFY,
    child,
    path,
    aliased,
    parameters,
    DSL.comment(""),
    TableOptions.table()
) {
    companion object {

        /**
         * The reference instance of <code>retrofy.game_database</code>
         */
        val GAME_DATABASE: GameDatabase = GameDatabase()
    }

    /**
     * The class holding records for this type
     */
    override fun getRecordType(): Class<GameDatabaseRecord> = GameDatabaseRecord::class.java

    /**
     * The column <code>retrofy.game_database.id</code>.
     */
    val ID: TableField<GameDatabaseRecord, Int?> = createField(DSL.name("id"), SQLDataType.INTEGER.nullable(false).identity(true), this, "")

    /**
     * The column <code>retrofy.game_database.title</code>.
     */
    val TITLE: TableField<GameDatabaseRecord, String?> = createField(DSL.name("title"), SQLDataType.VARCHAR(255), this, "")

    /**
     * The column <code>retrofy.game_database.system</code>.
     */
    val SYSTEM: TableField<GameDatabaseRecord, String?> = createField(DSL.name("system"), SQLDataType.VARCHAR(100), this, "")

    /**
     * The column <code>retrofy.game_database.thumbnail_url</code>.
     */
    val THUMBNAIL_URL: TableField<GameDatabaseRecord, String?> = createField(DSL.name("thumbnail_url"), SQLDataType.CLOB, this, "")

    private constructor(alias: Name, aliased: Table<GameDatabaseRecord>?): this(alias, null, null, aliased, null)
    private constructor(alias: Name, aliased: Table<GameDatabaseRecord>?, parameters: Array<Field<*>?>?): this(alias, null, null, aliased, parameters)

    /**
     * Create an aliased <code>retrofy.game_database</code> table reference
     */
    constructor(alias: String): this(DSL.name(alias))

    /**
     * Create an aliased <code>retrofy.game_database</code> table reference
     */
    constructor(alias: Name): this(alias, null)

    /**
     * Create a <code>retrofy.game_database</code> table reference
     */
    constructor(): this(DSL.name("game_database"), null)

    constructor(child: Table<out Record>, key: ForeignKey<out Record, GameDatabaseRecord>): this(Internal.createPathAlias(child, key), child, key, GAME_DATABASE, null)
    override fun getSchema(): Schema? = if (aliased()) null else Retrofy.RETROFY
    override fun getIdentity(): Identity<GameDatabaseRecord, Int?> = super.getIdentity() as Identity<GameDatabaseRecord, Int?>
    override fun getPrimaryKey(): UniqueKey<GameDatabaseRecord> = KEY_GAME_DATABASE_PRIMARY
    override fun `as`(alias: String): GameDatabase = GameDatabase(DSL.name(alias), this)
    override fun `as`(alias: Name): GameDatabase = GameDatabase(alias, this)
    override fun `as`(alias: Table<*>): GameDatabase = GameDatabase(alias.getQualifiedName(), this)

    /**
     * Rename this table
     */
    override fun rename(name: String): GameDatabase = GameDatabase(DSL.name(name), null)

    /**
     * Rename this table
     */
    override fun rename(name: Name): GameDatabase = GameDatabase(name, null)

    /**
     * Rename this table
     */
    override fun rename(name: Table<*>): GameDatabase = GameDatabase(name.getQualifiedName(), null)
}
