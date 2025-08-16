# Чистий деплой Paperfox Medusa (бекенд + адмінка)

_Варіант: існуюча PostgreSQL БД, Redis уже запущено; Nginx налаштований на `api.paperfox.top` і `admin.paperfox.top`._

---

## 0 Передумови

- На сервері є користувач `deploy` з SSH-доступом (alias `paperfox`). `ssh paperfox` з локального компа
- Встановлено: **Node 20**, **PM2**, **git**, **build-essential**, **Nginx**, **certbot** (сертифікати вже видані).
- PostgreSQL та Redis — зовнішні/вже запущені.
- У проекті існує `infra/pm2/ecosystem.config.cjs` з прод-конфігом PM2 Deploy.

---

## 1. Створення базової струкртури на сервері

- Виходимо що не існує папки проекту на сервері
- Запускаємо з локального компа з папки проекту `pm2 deploy infra/pm2/ecosystem.config.cjs production setup`
  → Створюється /home/deploy/apps/medusa-paperfox з підкаталогами shared, releases, current.
- Після цього створіть .env у current/.

## 2 Підготувати `.env` (на сервері)
- Підключитись `ssh paperfox`
- Створити .env `nano ~/apps/medusa-paperfox/current/.env` вставити та замінити значення

```
PORT=9000
DATABASE_URL=postgres://USER:PASSWORD@gxfxu236.psql.tools:10236/DATABASE
REDIS_URL=redis://:PASSWORD@127.0.0.1:6379/0
JWT_SECRET=secret
COOKIE_SECRET=secret
REDIS_URL=redis://:PASSWORD@127.0.0.1:6379/0
STORE_CORS=https://paperfox.top,https://www.paperfox.top
ADMIN_CORS=https://admin.paperfox.top
MEDUSA_BACKEND_URL=https://api.paperfox.top
PGSSLMODE=disable
FILE_PUBLIC_URL=https://api.paperfox.top
PROD_SERVER=~/apps/medusa-paperfox/apps/site
```

## 3. Запуск скрипта деплою

- З локальної машини з папки проекта `pm2 deploy infra/pm2/ecosystem.config.cjs production`
  PM2 виконає на сервері:
  - npm ci
  - npm run build
  - pm2 reload ecosystem.config.cjs --env production

## 4. Перевірки на сервері

```
pm2 ls
pm2 logs medusa-api --lines 100
ss -lntp | grep 9000
curl -I http://127.0.0.1:9000
curl -I https://api.paperfox.top
curl -I https://api.paperfox.top/auth/user/emailpass
curl -I https://admin.paperfox.top/app/
```

У браузері: https://admin.paperfox.top/app/ → перезавантажити без кешу (Cmd/Ctrl+Shift+R).

За потреби перезавантаження Nginx `sudo nginx -t && sudo systemctl reload nginx`

## 5. Типові збої та рішення

- Адмінка стукає в admin.paperfox.top замість api.paperfox.top
  → .env не підхопився.
  Рішення:

```
cd /home/deploy/apps/medusa-paperfox/current
npm ci && npm run build
pm2 restart medusa-api --update-env
```

- Очистити кеш у браузері.
- SASL: client password must be a string
  → помилка у DATABASE_URL.
- onnect() failed (111: Connection refused) у Nginx
  → бекенд не слухає порт. Перевірити pm2 logs.
- CORS блокує
  → перевірити STORE_CORS та ADMIN_CORS.

  ## 6. Оновлення після змін
  - Крок 1. Закомітити у гілку main `git push origin main`
  - Крок 2. Перезапустити білд `pm2 deploy infra/pm2/ecosystem.config.cjs production`

  Якщо змінювали .env — відредагуйте його у current/ перед деплоєм.
