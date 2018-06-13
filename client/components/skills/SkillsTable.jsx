version: '3.1'

services:

  # https://github.com/suzel/docker-postgrest
  postgrest:
    build:
      context: .
      args:
        POSTGREST_VERSION: "0.5.0.0"
    ports:
      - "3000:3000"
    environment:
      PGRST_DB_URI: postgres://app_user:secret@postgres:5432/app_db
      PGRST_DB_SCHEMA: public
      PGRST_DB_ANON_ROLE: app_user
    links:
      - postgres:postgres

  # https://github.com/sosedoff/pgweb
  pgweb:
    image: sosedoff/pgweb
    ports:
      - "8081:8081"
    links:
      - postgres:postgres
    environment:
      - DATABASE_URL=postgres://app_user:secret@postgres:5432/app_db?sslmode=disable
    depends_on:
      - postgres

  # https://hub.docker.com/_/postgres/
  postgres:
    image: postgres:alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: app_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres-data:/var/lib/postgresql/data
      # - ./sql/init.sql:/docker-entrypoint-initdb.d/init.sql

volumes:
  postgres-data: {}

