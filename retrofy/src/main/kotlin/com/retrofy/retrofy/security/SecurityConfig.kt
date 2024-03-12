package com.retrofy.retrofy.security

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
class SecurityConfig {
    val logger: Logger = LoggerFactory.getLogger(this::class.java)

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        return http
            .csrf { csrf -> csrf.disable() }
            .authorizeHttpRequests { authorizeRequests ->
                authorizeRequests.requestMatchers("/login").permitAll()
                authorizeRequests.requestMatchers("/api/v1/auth/login").permitAll()
                authorizeRequests.requestMatchers("/static/**", "favicon.ico", "manifest.json").permitAll()
                authorizeRequests.requestMatchers("/error").permitAll()
                authorizeRequests.anyRequest().authenticated()
            }
            .formLogin { login ->
                login
                    .usernameParameter("id")
                    .passwordParameter("password")
                    .successHandler(RetrofyAuthenticationSuccessHandler())
                    .failureHandler(RetrofyAuthenticationFailureHandler())
                    .loginPage("/login")
                    .loginProcessingUrl("/api/v1/auth/login")
            }
            .logout { logout ->
                logout
                    .logoutUrl("/api/v1/auth/logout")
                    .logoutSuccessUrl("/login")
            }
            .build()
    }
}