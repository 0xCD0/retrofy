package com.retrofy.retrofy.config

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import org.springframework.web.servlet.resource.PathResourceResolver
import java.io.IOException

@Configuration
class WebMvcConfig : WebMvcConfigurer {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry
            .addResourceHandler("files/**")
            .addResourceLocations("file:/retrofy/roms/")
            .setCachePeriod(0)
            .resourceChain(false)
            .addResolver(object : PathResourceResolver() {
                @Throws(IOException::class)
                override fun getResource(
                    resourcePath: String,
                    location: Resource
                ): Resource {
                    val requestedResource = location.createRelative(resourcePath)
                    logger.info("exists : ${requestedResource.exists()} / isReadable: ${requestedResource.isReadable} / $resourcePath")

                    return requestedResource
                }
            })

        registry
            .addResourceHandler("/**")
            .addResourceLocations("classpath:/static/")
            .resourceChain(true)
            .addResolver(object : PathResourceResolver() {
                @Throws(IOException::class)
                override fun getResource(
                    resourcePath: String,
                    location: Resource
                ): Resource {
                    val requestedResource = location.createRelative(resourcePath)
                    logger.info("exists : ${requestedResource.exists()} / isReadable: ${requestedResource.isReadable} / $resourcePath")

                    return if (requestedResource.exists() && requestedResource.isReadable) requestedResource
                    else ClassPathResource("/static/index.html")
                }
            })
    }
}