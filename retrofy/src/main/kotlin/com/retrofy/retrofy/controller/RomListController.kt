package com.retrofy.retrofy.controller

import com.retrofy.retrofy.model.response.ResponseModel
import com.retrofy.retrofy.service.gamedatabase.RomListService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class RomListController {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    @Autowired
    lateinit var romListService: RomListService

    @PostMapping("/api/v1/romList/update")
    fun updateRomList(system: String): ResponseModel {
        romListService.updateRomListDatabase(system.lowercase())
        return ResponseModel()
    }

    @PostMapping("/api/v1/romList/getRomList")
    fun getRomList(system: String): ResponseModel {
        val result = romListService.getRomListInfo(system.lowercase())

        return ResponseModel(
            data = result
        )
    }

    @PostMapping("/api/v1/romList/getRomInfo")
    fun getRomInfo(system: String, title: String): ResponseModel {
        val result = romListService.getRomInfo(system.lowercase(), title)

        return ResponseModel(
            data = result
        )
    }
}