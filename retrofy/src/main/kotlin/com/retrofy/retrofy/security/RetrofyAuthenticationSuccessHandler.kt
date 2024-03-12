package com.retrofy.retrofy.security

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import java.util.*
import kotlin.collections.HashMap

class RetrofyAuthenticationSuccessHandler : AuthenticationSuccessHandler {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    override fun onAuthenticationSuccess(
        request: HttpServletRequest,
        response: HttpServletResponse,
        authentication: Authentication
    ) {
        val session = request.session
        session.maxInactiveInterval = 1800

        val objMapper = ObjectMapper()

        response.status = HttpStatus.OK.value()
        val data = HashMap<String, Any>()
        data["status"] = response.status
        data["error"] = false
        data["timestamp"] = Calendar.getInstance().time
        response.setHeader("Content-Type", "application/json")
        response.outputStream.println(objMapper.writeValueAsString(data))
    }

}