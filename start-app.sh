#!/bin/bash

cd ./frontend || { echo "[ERROR]: такой папки нету"; exit 1; }

echo "[LOG]: Установка зависимостей"
npm install

echo "[LOG]: Сборка фронтенда"
npm run build

cd ..

echo "Запускаем docker-compose..."
docker-compose up --build
