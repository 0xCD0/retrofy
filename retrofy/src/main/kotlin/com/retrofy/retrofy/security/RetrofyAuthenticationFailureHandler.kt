package com.retrofy.retrofy.security

import com.fasterxml.jackson.databind.ObjectMapper
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AuthenticationFailureHandler
import java.util.Calendar

class RetrofyAuthenticationFailureHandler : AuthenticationFailureHandler {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    override fun onAuthenticationFailure(
        request: HttpServletRequest,
        response: HttpServletResponse,
        exception: AuthenticationException
    ) {
        val objMapper = ObjectMapper()

        response.status = HttpStatus.UNAUTHORIZED.value()
        val data = HashMap<String, Any>()
        data["status"] = response.status
        data["error"] = true
        data["timestamp"] = Calendar.getInstance().time
        data["exception"] = exception.message!!
        response.setHeader("Content-Type", "application/json")
        response.outputStream.println(objMapper.writeValueAsString(data))
    }
}