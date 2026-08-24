#!/usr/bin/env bash
set -euo pipefail

echo "=== Starting AI20K Deployment on AWS EC2 ==="

# Update package repositories
apt-get update -y
apt-get install -y ca-certificates curl gnupg git python3

# Install Docker
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

systemctl enable docker
systemctl start docker

# Clone repository branch deploy
mkdir -p /opt/app
cd /opt/app
if [ ! -d "QuestionAI20k" ]; then
  git clone -b deploy https://github.com/vuvanHuy2409/QuestionAI20k.git
fi

cd /opt/app/QuestionAI20k
git fetch origin deploy
git checkout deploy
git pull origin deploy

# Run Docker Compose
cd /opt/app/QuestionAI20k/quiz-system-php
docker compose down || true
docker compose up --build -d

echo "=== Deployment Completed Successfully ==="
