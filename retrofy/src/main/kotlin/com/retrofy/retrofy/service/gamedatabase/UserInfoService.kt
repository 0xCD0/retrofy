package com.retrofy.retrofy.service.gamedatabase

import com.retrofy.retrofy.jooq.tables.references.USER
import com.retrofy.retrofy.model.database.UserModel
import org.jooq.DSLContext
import org.jooq.impl.DSL
import org.springframework.stereotype.Repository

@Repository
class UserInfoService(val dsl: DSLContext) {

    fun getUserInfo(userId: String): UserModel? {
        val result = dsl.select(DSL.asterisk())
            .from(USER)
            .where(USER.USER_ID.eq(userId))
            .fetchOne()

        return if (result != null) {
            UserModel(
                id = result.get(USER.ID)!!,
                userId = result.get(USER.USER_ID)!!,
                password = result.get(USER.PASSWORD)!!,
                userRole = result.get(USER.ROLE)!!
            )
        } else {
            null
        }
    }

    fun updateUserInfo(userId: String, newUserId: String): Boolean {
        val result = dsl.update(USER)
            .set(USER.USER_ID, newUserId)
            .where(USER.USER_ID.eq(userId))
            .execute()

        return result == 1
    }

    fun updateUserPassword(userId: String, userPw: String): Boolean{
        val result = dsl.update(USER)
            .set(USER.PASSWORD, userPw)
            .where(USER.USER_ID.eq(userId))
            .execute()

        return result == 1
    }
}