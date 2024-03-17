import nu.studer.gradle.jooq.JooqEdition
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.springframework.boot.gradle.tasks.bundling.BootJar
import java.util.*

var frontendDir = "$projectDir/src/main/frontend"

buildscript {
    repositories {
        mavenLocal()
        mavenCentral()
    }

    dependencies {
        classpath("org.flywaydb:flyway-mysql:10.8.1")
    }
}

plugins {
    id("org.springframework.boot") version "3.2.3"
    id("io.spring.dependency-management") version "1.1.4"
    id("nu.studer.jooq") version "9.0"
    id("org.flywaydb.flyway") version "10.8.1"
    id("war")
    kotlin("jvm") version "1.9.22"
    kotlin("plugin.spring") version "1.9.22"
}

group = "com.retrofy"
version = "1.0"


java {
    sourceCompatibility = JavaVersion.VERSION_21
}

tasks.jar {
    archiveFileName.set("ROOT.jar")
}

tasks.bootJar {
    archiveFileName.set("ROOT.jar")
}

tasks.war {
    archiveFileName.set("ROOT.war")
}

tasks.bootWar {
    archiveFileName.set("ROOT.war")
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring
    implementation("org.springframework.boot:spring-boot-starter-security:3.2.3")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")

    // RDS
    implementation("org.springframework.boot:spring-boot-starter-jdbc")
    implementation("com.mysql:mysql-connector-j:8.3.0")

    // Flyway
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-mysql")

    // Jooq
    implementation("org.springframework.boot:spring-boot-starter-jooq:3.2.3")
    implementation("org.jooq:jooq-codegen:3.18.11")
    implementation("org.jooq:jooq-meta:3.18.11")
}

dependencies {
    jooqGenerator("com.mysql:mysql-connector-j:8.3.0")
    jooqGenerator("org.jooq:jooq-meta:3.18.11")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "21"
    }
}

jooq {
    version.set("3.18.11")
    edition.set(JooqEdition.OSS)
    configurations {
        create("main") {
            jooqConfiguration.apply {
                generateSchemaSourceOnCompilation = false
                logging = org.jooq.meta.jaxb.Logging.INFO
                jdbc.apply {
                    driver = "com.mysql.cj.jdbc.Driver"
                    url = "jdbc:mysql://localhost:3306/retrofy?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8" // # For develop
                    user = "root"
                    password = System.getenv("MYSQL_PASSWORD")
                }
                generator.apply {
                    name = "org.jooq.codegen.KotlinGenerator"
                    database.apply {
                        name = "org.jooq.meta.mysql.MySQLDatabase"
                        inputSchema = "retrofy"
                        includes = ".*"
                        excludes = listOf(
                            "flyway_schema_history",
                        ).joinToString("|")
                    }
                    generate.apply {
                        isDeprecated = false
                        isTables = true
                        isImmutablePojos = false
                    }
                    target.apply {
                        packageName = "com.retrofy.retrofy.jooq"
                        directory = "src/main/kotlin/generated"
                    }
                    strategy.name = "org.jooq.codegen.DefaultGeneratorStrategy"
                }
            }
        }
    }
}

sourceSets {
    main {
        resources {
            srcDir("$projectDir/src/main/resources")
        }
    }
}

tasks.processResources {
    duplicatesStrategy = DuplicatesStrategy.INCLUDE
    dependsOn("copyReactBuildFiles")
}

task<Exec>("npmInstall") {
    workingDir(frontendDir)
    inputs.dir(frontendDir)

    group = BasePlugin.BUILD_GROUP
    if (System.getProperty("os.name").lowercase(Locale.ROOT).contains("windows")) {
        commandLine("npm.cmd", "install")
    } else {
        commandLine("npm", "install")
    }
}

task<Exec>("buildReact") {
    dependsOn("npmInstall")
    workingDir(frontendDir)
    inputs.dir(frontendDir)

    group = BasePlugin.BUILD_GROUP

    if (System.getProperty("os.name").lowercase(Locale.ROOT).contains("windows")) {
        commandLine("npm.cmd", "run-script", "build")
    } else {
        commandLine("npm", "run-script", "build")
    }
}

task<Copy>("copyReactBuildFiles") {
    dependsOn("buildReact")
    from("$frontendDir/build")
    into("$projectDir/src/main/resources/static")
}

