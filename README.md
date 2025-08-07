# Перебудувати й запустіть стек, із кореня репозиторію
docker compose -f infra/docker-compose.yml --env-file .env up -d --build

# Логи бекенда 
docker compose -f infra/docker-compose.yml logs -f backend