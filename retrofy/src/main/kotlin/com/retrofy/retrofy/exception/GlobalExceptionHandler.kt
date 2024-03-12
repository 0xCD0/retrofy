package com.retrofy.retrofy.exception

import com.retrofy.retrofy.model.response.ResponseExceptionModel
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

@ControllerAdvice
class GlobalExceptionHandler {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    @ExceptionHandler(Exception::class)
    fun handleAllException(ex: Exception): ResponseEntity<ResponseExceptionModel> {
        logger.error(ex.message)

        val response = ResponseExceptionModel(
            error = true,
            message = ex.message!!,
            HttpStatus.BAD_REQUEST
        )
        return ResponseEntity(response, HttpStatus.BAD_REQUEST)
    }
}