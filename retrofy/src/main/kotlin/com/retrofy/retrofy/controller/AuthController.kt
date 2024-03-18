package com.retrofy.retrofy.controller

import com.retrofy.retrofy.model.response.ResponseModel
import com.retrofy.retrofy.service.gamedatabase.UserInfoService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class AuthController {

    @Autowired
    lateinit var userInfoService: UserInfoService


    @GetMapping("/api/v1/auth/getLoginStatus")
    fun getUserLoggedInStatus(): ResponseModel {
        var result = true
        if (SecurityContextHolder.getContext().authentication.principal is String) {
            result = false
        }

        return ResponseModel(
            data = result
        )
    }

    @PostMapping("/api/v1/auth/updateUserId")
    fun updateUserId(userId: String, newUserId: String): ResponseModel {
        val result = userInfoService.updateUserInfo(userId, newUserId)

        return if (result) {
            ResponseModel()
        } else {
            ResponseModel(
                statusCode = HttpStatus.BAD_REQUEST
            )
        }
    }

    @PostMapping("/api/v1/auth/updateUserPw")
    fun updateUserPassword(userId: String, newUserId: String): ResponseModel {
        val result = userInfoService.updateUserPassword(userId, newUserId)

        return if (result) {
            ResponseModel()
        } else {
            ResponseModel(
                statusCode = HttpStatus.BAD_REQUEST
            )
        }
    }

}