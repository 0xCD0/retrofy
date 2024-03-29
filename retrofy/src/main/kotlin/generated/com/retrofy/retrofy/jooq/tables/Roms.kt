/*
 * This file is generated by jOOQ.
 */
package com.retrofy.retrofy.jooq.tables


import com.retrofy.retrofy.jooq.Retrofy
import com.retrofy.retrofy.jooq.keys.KEY_ROMS_PRIMARY
import com.retrofy.retrofy.jooq.tables.records.RomsRecord

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
open class Roms(
    alias: Name,
    child: Table<out Record>?,
    path: ForeignKey<out Record, RomsRecord>?,
    aliased: Table<RomsRecord>?,
    parameters: Array<Field<*>?>?
): TableImpl<RomsRecord>(
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
         * The reference instance of <code>retrofy.roms</code>
         */
        val ROMS: Roms = Roms()
    }

    /**
     * The class holding records for this type
     */
    override fun getRecordType(): Class<RomsRecord> = RomsRecord::class.java

    /**
     * The column <code>retrofy.roms.id</code>.
     */
    val ID: TableField<RomsRecord, Int?> = createField(DSL.name("id"), SQLDataType.INTEGER.nullable(false).identity(true), this, "")

    /**
     * The column <code>retrofy.roms.title</code>.
     */
    val TITLE: TableField<RomsRecord, String?> = createField(DSL.name("title"), SQLDataType.VARCHAR(255), this, "")

    /**
     * The column <code>retrofy.roms.filename</code>.
     */
    val FILENAME: TableField<RomsRecord, String?> = createField(DSL.name("filename"), SQLDataType.VARCHAR(255), this, "")

    /**
     * The column <code>retrofy.roms.filepath</code>.
     */
    val FILEPATH: TableField<RomsRecord, String?> = createField(DSL.name("filepath"), SQLDataType.VARCHAR(255), this, "")

    /**
     * The column <code>retrofy.roms.system</code>.
     */
    val SYSTEM: TableField<RomsRecord, String?> = createField(DSL.name("system"), SQLDataType.VARCHAR(100), this, "")

    /**
     * The column <code>retrofy.roms.thumbnail_base64</code>.
     */
    val THUMBNAIL_BASE64: TableField<RomsRecord, String?> = createField(DSL.name("thumbnail_base64"), SQLDataType.CLOB, this, "")

    /**
     * The column <code>retrofy.roms.favorite</code>.
     */
    val FAVORITE: TableField<RomsRecord, Int?> = createField(DSL.name("favorite"), SQLDataType.INTEGER.defaultValue(DSL.inline("0", SQLDataType.INTEGER)), this, "")

    /**
     * The column <code>retrofy.roms.use_game_db</code>.
     */
    val USE_GAME_DB: TableField<RomsRecord, Int?> = createField(DSL.name("use_game_db"), SQLDataType.INTEGER, this, "")

    private constructor(alias: Name, aliased: Table<RomsRecord>?): this(alias, null, null, aliased, null)
    private constructor(alias: Name, aliased: Table<RomsRecord>?, parameters: Array<Field<*>?>?): this(alias, null, null, aliased, parameters)

    /**
     * Create an aliased <code>retrofy.roms</code> table reference
     */
    constructor(alias: String): this(DSL.name(alias))

    /**
     * Create an aliased <code>retrofy.roms</code> table reference
     */
    constructor(alias: Name): this(alias, null)

    /**
     * Create a <code>retrofy.roms</code> table reference
     */
    constructor(): this(DSL.name("roms"), null)

    constructor(child: Table<out Record>, key: ForeignKey<out Record, RomsRecord>): this(Internal.createPathAlias(child, key), child, key, ROMS, null)
    override fun getSchema(): Schema? = if (aliased()) null else Retrofy.RETROFY
    override fun getIdentity(): Identity<RomsRecord, Int?> = super.getIdentity() as Identity<RomsRecord, Int?>
    override fun getPrimaryKey(): UniqueKey<RomsRecord> = KEY_ROMS_PRIMARY
    override fun `as`(alias: String): Roms = Roms(DSL.name(alias), this)
    override fun `as`(alias: Name): Roms = Roms(alias, this)
    override fun `as`(alias: Table<*>): Roms = Roms(alias.getQualifiedName(), this)

    /**
     * Rename this table
     */
    override fun rename(name: String): Roms = Roms(DSL.name(name), null)

    /**
     * Rename this table
     */
    override fun rename(name: Name): Roms = Roms(name, null)

    /**
     * Rename this table
     */
    override fun rename(name: Table<*>): Roms = Roms(name.getQualifiedName(), null)
}
