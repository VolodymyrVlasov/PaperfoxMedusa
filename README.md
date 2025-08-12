# Paperfox Medusa Deployment Guide

## 1. Опис
Цей репозиторій містить конфігурацію для швидкого розгортання **Medusa API** (`api.paperfox.top`), адмінки (`admin.paperfox.top`) та фронтенду (`paperfox.top`) з підключенням до PostgreSQL і Redis.  
Передбачено роздачу статики через **Nginx**, підтримку завантаження файлів і налаштування CORS.

---

## 2. Структура
PaperfoxMedusa
```
│
├── apps/
│ └── site/ # Фронтенд-статіка
│
├── static/ # Папка для завантажених файлів
│
├── infra/
│ └── nginx/
│ ├── api.paperfox.top.conf
│ ├── paperfox.top.conf
│ └── admin.paperfox.top.conf
│
├── medusa-config.js # Конфіг Medusa
├── .env # Секрети і налаштування
└── README.md # Цей файл
```


---

## 3. .env
Вписати данні
```
PORT=9000
DATABASE_URL=postgres://paperfoxadmin:***@gxfxu236.psql.tools:10236/paperfoxdb
REDIS_URL=redis://:***@127.0.0.1:6379/0
JWT_SECRET=***      # 64+ hex
COOKIE_SECRET=***   # 64+ hex
STORE_CORS=https://paperfox.top,https://www.paperfox.top
ADMIN_CORS=https://admin.paperfox.top
AUTH_CORS=https://admin.paperfox.top
MEDUSA_BACKEND_URL=https://api.paperfox.top
PGSSLMODE=disable
```

---

## 4. medusa-config.js
Створити файл і скопіювати у нього
```
const { loadEnv, defineConfig } = require('@medusajs/framework/utils')
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: { ssl: false },
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS || process.env.ADMIN_CORS,
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
              upload_dir: "static",
              backend_url: "https://api.paperfox.top/static",
            },
          },
        ],
      },
    },
  ],
})
```

---

## 5. Nginx конфіги
- infra/nginx/api.paperfox.top.conf
```
server {
  listen 80;
  server_name api.paperfox.top;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name api.paperfox.top;

  ssl_certificate     /etc/letsencrypt/live/api.paperfox.top/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.paperfox.top/privkey.pem;

  location /static/ {
    alias /home/deploy/apps/medusa-paperfox/medusa-paperfox/static/;
    access_log off;
    add_header Cache-Control "public, max-age=604800";
    try_files $uri =404;
  }

  location / {
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

- infra/nginx/paperfox.top.conf
```
server {
  listen 80;
  server_name paperfox.top www.paperfox.top;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name paperfox.top www.paperfox.top;

  ssl_certificate     /etc/letsencrypt/live/paperfox.top/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/paperfox.top/privkey.pem;

  root /home/deploy/apps/medusa-paperfox/apps/site;
  index index.html;
  
  location / {
    try_files $uri /index.html;
  }
}
```

- infra/nginx/admin.paperfox.top.conf
```
server {
  listen 80;
  server_name admin.paperfox.top;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl;
  server_name admin.paperfox.top;

  ssl_certificate     /etc/letsencrypt/live/admin.paperfox.top/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/admin.paperfox.top/privkey.pem;

  root /home/deploy/apps/medusa-paperfox/apps/admin;
  index index.html;
  
  location / {
    try_files $uri /index.html;
  }
}
```

---

## 6. Розгортання з нуля
#### Клонування репозиторію
```
git clone https://github.com/VolodymyrVlasov/PaperfoxMedusa.git
cd PaperfoxMedusa
```

#### Встановлення залежностей
`npm install`

#### Створення папки для статики
`mkdir -p static`

#### Збірка
`npm run build`

## 5. Запуск через PM2
```
pm2 start npm --name "medusa-api" -- run start
pm2 save
```

## 6. Активація Nginx конфігів
```
sudo ln -s /home/deploy/apps/medusa-paperfox/infra/nginx/api.paperfox.top.conf /etc/nginx/sites-enabled/
sudo ln -s /home/deploy/apps/medusa-paperfox/infra/nginx/paperfox.top.conf /etc/nginx/sites-enabled/
ssudo ln -s /home/deploy/apps/medusa-paperfox/infra/nginx/admin.paperfox.top.conf /etc/nginx/sites-enabled/
ssudo nginx -t && sudo systemctl reload nginx
```

---

## 7. Додатково
#### Оновлення коду:
```
git pull
npm install
npm run build
pm2 restart medusa-api --update-env
```

#### Перегляд логів:
`pm2 logs medusa-api`

#### Відновлення після перезавантаження:
`pm2 resurrect`

---

## 8. Результат
- API: https://api.paperfox.top
- Файли: https://api.paperfox.top/static/<filename>
- Фронтенд: https://paperfox.top
- Адмінка: https://admin.paperfox.top
