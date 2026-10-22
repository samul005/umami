#!/bin/bash
set -e
cd /home/opc/vistiq

echo "[$(date)] Stopping vistiq-analytics to free memory..."
docker compose -f docker-compose.prod.yml stop vistiq

echo "[$(date)] 1/3 Building deps stage..."
docker build --target deps -t vistiq:deps .

echo "[$(date)] 2/3 Building builder stage..."
docker build --target builder -t vistiq:builder .

echo "[$(date)] 3/3 Building runner stage (vistiq:latest)..."
docker build -t vistiq:latest .

echo "[$(date)] Updating docker-compose.prod.yml..."
sed -i 's|image: ghcr.io/umami-software/umami:postgresql-latest|image: vistiq:latest|g' docker-compose.prod.yml

echo "[$(date)] Starting containers..."
docker compose -f docker-compose.prod.yml up -d --remove-orphans

echo "[$(date)] Build & deployment complete!"
