FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .


RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .


CMD ["uvicorn", "ml:app", "--host", "0.0.0.0", "--port", "85"]