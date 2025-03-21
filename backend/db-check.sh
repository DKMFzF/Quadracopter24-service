#!/bin/bash

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  >&2 echo "Проверяем db: $host:$port..."
  sleep 2
done

>&2 echo "Postgres доступна"
exec $cmd