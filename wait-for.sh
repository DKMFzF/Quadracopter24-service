#!/bin/sh

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  echo "Ожидание $host:$port..."
  sleep 2
done

echo "$host:$port доступен, запуск команды: $cmd"
exec $cmd