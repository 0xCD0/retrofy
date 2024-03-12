/*
 * This file is generated by jOOQ.
 */
package com.retrofy.retrofy.jooq.keys


import com.retrofy.retrofy.jooq.tables.GameDatabase
import com.retrofy.retrofy.jooq.tables.Roms
import com.retrofy.retrofy.jooq.tables.User
import com.retrofy.retrofy.jooq.tables.records.GameDatabaseRecord
import com.retrofy.retrofy.jooq.tables.records.RomsRecord
import com.retrofy.retrofy.jooq.tables.records.UserRecord

import org.jooq.UniqueKey
import org.jooq.impl.DSL
import org.jooq.impl.Internal



// -------------------------------------------------------------------------
// UNIQUE and PRIMARY KEY definitions
// -------------------------------------------------------------------------

val KEY_GAME_DATABASE_PRIMARY: UniqueKey<GameDatabaseRecord> = Internal.createUniqueKey(GameDatabase.GAME_DATABASE, DSL.name("KEY_game_database_PRIMARY"), arrayOf(GameDatabase.GAME_DATABASE.ID), true)
val KEY_ROMS_PRIMARY: UniqueKey<RomsRecord> = Internal.createUniqueKey(Roms.ROMS, DSL.name("KEY_roms_PRIMARY"), arrayOf(Roms.ROMS.ID), true)
val KEY_USER_PRIMARY: UniqueKey<UserRecord> = Internal.createUniqueKey(User.USER, DSL.name("KEY_user_PRIMARY"), arrayOf(User.USER.ID), true)
