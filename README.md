
## Retrofy - Simple web self-hosted emulator frontend

Yes. I really wanted to have a simple, easy-to-use self-hosted retro emulator, and no matter how much I looked, I couldn't find a simple web-based emulator solution that I wanted, so I start to create this project.

This project is powered by [emulatorJS](https://emulatorjs.org/) project. You can use all the same features you used in [emulatorJS](https://emulatorjs.org/).

## How to run
```yaml
version: '3.8'

x-env: &env
  environment:
  - MYSQL_DATABASE=retrofy
  - MYSQL_ROOT_PASSWORD=password # Set user custom db password

name: retrofy
services:
  app:
    container_name: retrofy-server
    image: 0xcd0/retrofy
    volumes:
      - /retrofy/roms:/retrofy/roms/
    ports:
      - 8080:8080
    restart: always
    <<: *env
    tty: true
    depends_on:
      db:
        condition: service_healthy
    networks:
      - retrofy-net

  db:
    container_name: retrofy-mysql
    image: mysql:8.1
    volumes:
      - /retrofy/dbdata:/var/lib/mysql
    ports:
      - 3306:3306
    restart: always
    <<: *env
    networks:
      - retrofy-net
    healthcheck:
      test: mysqladmin ping -h 127.0.0.1 -uroot -p$$MYSQL_ROOT_PASSWORD
      interval: 30s
      timeout: 1h
      retries: 100

networks:
  retrofy-net:
    driver: bridge
```


## Support Systems
 - GB / GBC
 - GBA
 - NES
 - SNES
 - N64
 - PSX
 - SEGA 32x (Unstable)
 - SEGA CD
 - SEGA GG
 - SEGA MS
 - SEGA MD
 - SEGA SATURN
