#!/bin/bash
set -e
docker compose build core
docker compose build app
docker compose build web electron
docker compose up -d web electron -t 1
