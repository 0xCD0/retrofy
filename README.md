
## Retrofy - Simple web-based self-hosted emulator frontend

Yes. I really wanted to have a simple, easy-to-use self-hosted retro emulator, and no matter how much I looked, I couldn't find a simple web-based emulator solution that I wanted, so I start to create this project.

This project is powered by [emulatorJS](https://emulatorjs.org/) project. You can use all the same features you used in [emulatorJS](https://emulatorjs.org/).

## How to run
You can use docker-compose to paste the yaml below, change the password for the database, and run it.

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
        # set your local game directory on left side (Do not modify the Container Directory path)
      - {Set your game directory}:/retrofy/roms/
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
      # Enter the path where the database will be stored
      - {Set your database directory}:/var/lib/mysql
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

## When run first time
・The initial ID is `admin` and the password is `p@ssw0rd`.<br/>
Don't worry. You can change your ID and password on the settings screen after logging in.
![image](https://github.com/0xCD0/retrofy/assets/4960838/4475a542-96b5-4315-946c-e71621e0a98c)

・Update game database and update game list of your own games on Settings menu.
![image](https://github.com/0xCD0/retrofy/assets/4960838/68451ea6-4b00-4fe2-ab08-69398c9a689a)


## Structure of the Game Directory
The directory structure for the specified local game directory is shown below.
The following is just an example, all file extensions supported by EmulatorJS are supported by default, including ZIP files of course!
```
[Local game directory you set up in docker-compose]
├── gb
│   ├── game.gb
│   └── game.gbc
├── gba
│   └── game.gba
├── n64
│   └── game.n64
├── nes
│   └── game.nes
├── snes
│   ├── game.sfc
│   └── game.snes
├── psx
│   ├── game.iso
│   └── game.pbp
├── segagg
│   └── game.gg
├── segamd
│   └── game.md
└── segams
    └── game.sms
```

## Support Systems
 - GB / GBC
 - GBA
 - NES
 - SNES
 - N64
 - PSX
 - SEGA GG
 - SEGA MS
 - SEGA MD

## RoadMap
The goal is to be able to run any system supported by Emulator JS.

