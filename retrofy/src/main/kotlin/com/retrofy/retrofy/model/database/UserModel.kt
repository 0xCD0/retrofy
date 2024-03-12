package com.retrofy.retrofy.model.database

data class UserModel(
    var id: Int = 0,
    var userId: String = "",
    var password: String = "",
    var userRole: String = ""
)
