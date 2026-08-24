FROM python:3.12-slim

WORKDIR /app

COPY server.py schema.sql seed.sql ./
COPY public ./public

RUN mkdir -p /app/data

ENV PYTHONUNBUFFERED=1
ENV QUIZ_PORT=8080
ENV QUIZ_HOST=0.0.0.0

EXPOSE 8080

CMD ["python", "server.py"]
