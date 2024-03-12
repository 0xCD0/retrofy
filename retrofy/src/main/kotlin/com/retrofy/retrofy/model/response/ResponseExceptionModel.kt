package com.retrofy.retrofy.model.response

import org.springframework.http.HttpStatus

data class ResponseExceptionModel(
 val error : Boolean = false,
    val message : String = "",
    val statusCode: HttpStatus = HttpStatus.BAD_REQUEST
)