FROM mcr.microsoft.com/openjdk/jdk:21-ubuntu

RUN apt update && apt update

WORKDIR /
RUN mkdir /retrofy
RUN mkdir /retrofy/bin
RUN mkdir /retrofy/roms

WORKDIR /retrofy/bin
COPY ROOT.jar .

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=release", "/retrofy/bin/ROOT.jar"]

EXPOSE 8080