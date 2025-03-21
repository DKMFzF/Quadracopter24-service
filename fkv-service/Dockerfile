FROM python:3.10-buster as builder

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libblas-dev \
    liblapack-dev \
    gfortran \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

FROM python:3.10-slim-buster

WORKDIR /app

COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /app /app

EXPOSE 8000

COPY db-check.sh /db-check.sh
RUN chmod +x /db-check.sh
RUN apt-get update && apt-get install -y netcat bash

CMD ["python", "src/main.py"]