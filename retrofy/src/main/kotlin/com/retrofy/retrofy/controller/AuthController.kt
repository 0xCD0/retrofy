package com.retrofy.retrofy.controller

import com.retrofy.retrofy.model.response.ResponseModel
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class AuthController {

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
}