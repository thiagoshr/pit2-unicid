FROM python:3.10.12-slim-bullseye

RUN apt-get update && apt-get install -y curl

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install -r requirements.txt

ENV FLASK_ENV="docker"
ENV FLASK_APP="app.py"

# for debugging
ENV PYTHONDONTWRITEBYTECODE 1 

# for logging
ENV PYTHONUNBUFFERED 1

EXPOSE 5000

COPY src/ .


