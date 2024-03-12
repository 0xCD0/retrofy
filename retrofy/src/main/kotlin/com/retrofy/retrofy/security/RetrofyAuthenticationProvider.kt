package com.retrofy.retrofy.security

import com.retrofy.retrofy.model.user.UserDetailModel
import com.retrofy.retrofy.service.gamedatabase.UserInfoService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class RetrofyAuthenticationProvider : AuthenticationProvider {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    @Autowired
    lateinit var userInfoService: UserInfoService

    override fun authenticate(authentication: Authentication?): Authentication {

        val authToken = authentication as UsernamePasswordAuthenticationToken

        val userModel = userInfoService.getUserInfo(authToken.principal.toString())
            ?: throw BadCredentialsException("Login failed")

        if (bCryptPasswordEncoder().matches(authToken.credentials.toString(), userModel.password)) {
            val userDetail =
                UserDetailModel(authToken.principal.toString(), authToken.credentials.toString(), userModel.userRole)
            return UsernamePasswordAuthenticationToken(userDetail, userDetail.password, userDetail.authorities)
        } else {
            throw BadCredentialsException("Login failed")
        }
    }

    override fun supports(authentication: Class<*>?): Boolean {
        return true
    }

    @Bean
    fun bCryptPasswordEncoder(): BCryptPasswordEncoder {
        return BCryptPasswordEncoder()
    }

}