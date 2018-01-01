#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER mtools;
    CREATE DATABASE mtools;
    GRANT ALL PRIVILEGES ON DATABASE mtools TO mtools;
EOSQL
