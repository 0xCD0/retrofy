package com.retrofy.retrofy.model.database

data class RomsModel(
    val id: Int = 0,
    val title: String = "",
    val fileName: String = "",
    val filePath: String = "",
    val system: String = "",
    val thumbnailBase64: String = "",
    val favorite: Int = 0,
    val useGameDb: Int = 0,
)