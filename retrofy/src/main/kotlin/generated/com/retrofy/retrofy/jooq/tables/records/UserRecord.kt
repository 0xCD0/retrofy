/*
 * This file is generated by jOOQ.
 */
package com.retrofy.retrofy.jooq.tables.records


import com.retrofy.retrofy.jooq.tables.User

import org.jooq.Record1
import org.jooq.impl.UpdatableRecordImpl


/**
 * This class is generated by jOOQ.
 */
@Suppress("UNCHECKED_CAST")
open class UserRecord() : UpdatableRecordImpl<UserRecord>(User.USER) {

    open var id: Int?
        set(value): Unit = set(0, value)
        get(): Int? = get(0) as Int?

    open var userId: String?
        set(value): Unit = set(1, value)
        get(): String? = get(1) as String?

    open var password: String?
        set(value): Unit = set(2, value)
        get(): String? = get(2) as String?

    open var role: String?
        set(value): Unit = set(3, value)
        get(): String? = get(3) as String?

    // -------------------------------------------------------------------------
    // Primary key information
    // -------------------------------------------------------------------------

    override fun key(): Record1<Int?> = super.key() as Record1<Int?>

    /**
     * Create a detached, initialised UserRecord
     */
    constructor(id: Int? = null, userId: String? = null, password: String? = null, role: String? = null): this() {
        this.id = id
        this.userId = userId
        this.password = password
        this.role = role
        resetChangedOnNotNull()
    }
}