#!/bin/bash

cd ./fkv-client || { echo "[ERROR]: такой папки нету"; exit 1; }

echo "[LOG]: Установка зависимостей"
npm install

echo "[LOG]: Сборка фронтенда"
npm run build

cd ..

echo "[LOG]: Запускаем docker-compose"
docker-compose up --build
