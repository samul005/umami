#!/bin/bash
BACKUP_DIR="/home/opc/vistiq/backups"
mkdir -p "$BACKUP_DIR"
DATE=$(date +%Y%m%d_%H%M%S)
sudo docker run --rm postgres:17-alpine pg_dump 'postgresql://postgres.kngajicvwairxrdordxk:y8%23h3m5%5E%23%3FPLfQJ@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require' | gzip > "$BACKUP_DIR/vistiq_backup_$DATE.sql.gz"
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +7 -delete
echo "Backup created: $BACKUP_DIR/vistiq_backup_$DATE.sql.gz"
