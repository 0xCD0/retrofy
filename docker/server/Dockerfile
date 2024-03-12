FROM mcr.microsoft.com/openjdk/jdk:21-ubuntu

RUN apt update && apt update

WORKDIR /
RUN mkdir /retrofy
RUN mkdir /retrofy/bin
RUN mkdir /retrofy/roms

WORKDIR /retrofy/roms
RUN mkdir gb gba nes snes n64 psx sega32x segacd segagg segams segamd segasaturn

WORKDIR /retrofy/bin
COPY ROOT.jar .

ENTRYPOINT ["java", "-jar", "/retrofy/bin/ROOT.jar"]

EXPOSE 8080