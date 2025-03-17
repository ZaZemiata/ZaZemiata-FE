#!/bin/bash

# Конфигурационни променливи
DB_NAME="zazemiata_db"
BACKUP_DIR="/var/backups/postgres"
MAX_BACKUPS=7  # Брой бекъпи, които да се пазят

# Създаване на директория за бекъпи, ако не съществува
mkdir -p "$BACKUP_DIR"

# Име на бекъп файла с timestamp
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql.gz"

# Log файл
LOG_FILE="$BACKUP_DIR/backup.log"

# Функция за логване
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

# Създаване на бекъп
log_message "Започване на бекъп на базата данни $DB_NAME"

if pg_dump "$DB_NAME" | gzip > "$BACKUP_FILE"; then
    log_message "Бекъпът е създаден успешно: $BACKUP_FILE"
    
    # Проверка на размера на бекъпа
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    log_message "Размер на бекъпа: $BACKUP_SIZE"
    
    # Ротация на бекъпите - изтриване на най-старите файлове
    BACKUP_COUNT=$(ls -1 "$BACKUP_DIR"/*.sql.gz 2>/dev/null | wc -l)
    if [ "$BACKUP_COUNT" -gt "$MAX_BACKUPS" ]; then
        OLD_BACKUPS=$(ls -1t "$BACKUP_DIR"/*.sql.gz | tail -n +$((MAX_BACKUPS + 1)))
        for old_backup in $OLD_BACKUPS; do
            rm "$old_backup"
            log_message "Изтрит стар бекъп: $old_backup"
        done
    fi
else
    log_message "ГРЕШКА: Неуспешно създаване на бекъп"
    exit 1
fi

# Проверка на свободното място
FREE_SPACE=$(df -h "$BACKUP_DIR" | awk 'NR==2 {print $4}')
log_message "Свободно място в директорията за бекъпи: $FREE_SPACE"

log_message "Процесът на бекъп завършен успешно"
