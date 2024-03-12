package com.retrofy.retrofy.model.response

import org.springframework.http.HttpStatus

data class ResponseModel(
    val message: String? = "",
    val data: Any? = null,
    val statusCode: HttpStatus? = HttpStatus.OK
)