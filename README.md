
## Retrofy - Simple web self-hosted emulator frontend

Yes. I really wanted to have a simple, easy-to-use self-hosted retro emulator, and no matter how much I looked, I couldn't find a simple web-based emulator solution that I wanted, so I start to create this project.

This project is powered by [emulatorJS](https://emulatorjs.org/) project. You can use all the same features you used in [emulatorJS](https://emulatorjs.org/).

## How to run
```yaml
version: '3.8'

name: retrofy
services:
  app:
    container_name: retrofy-server
    # TBD
    # build: 
    #   context: server
    #   dockerfile: Dockerfile
    # volumes:
    #   - /retrofy/roms:/retrofy/roms
    ports:
      - 8080:8080
    restart: always
    environment:
      - MYSQL_PASSWORD=password
    tty: true
    depends_on:
      db:
        condition: service_started
    networks:
      - retrofy

  db:
    container_name: retrofy-mysql
    image: mysql:8.0
    volumes:
      - /retrofy/dbdata:/var/lib/mysql
    ports:
      - 3306:3306
    restart: always
    environment:
      - MYSQL_DATABASE=retrofy
      - MYSQL_ROOT_PASSWORD=password
    networks:
      - retrofy

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