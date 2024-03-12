package com.retrofy.retrofy.controller

import com.retrofy.retrofy.model.response.ResponseModel
import com.retrofy.retrofy.service.gamedatabase.GameDatabaseService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class GameDatabaseController {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    @Autowired
    lateinit var gameDatabaseService: GameDatabaseService

    @GetMapping("/api/v1/gameDatabase/updateDatabase")
    fun updateDatabase(): ResponseModel {
        val result = gameDatabaseService.updateDatabase()

        return ResponseModel(
            message = "OK",
        )
    }

    @GetMapping("/api/v1/gameDatabase/get/{id}")
    fun getById(id: Int): ResponseModel {
        val result = gameDatabaseService.getById(id)

        return ResponseModel(
            message = "OK",
            data = result,
        )
    }
}