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
  // v2: модулі задаються масивом, file-модуль + local-провайдер
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
api.paperfox.top.conf
- `nano /home/deploy/apps/medusa-paperfox/medusa-paperfox/infra/nginx/api.paperfox.top.conf`
- `sudo nano /etc/nginx/sites-available/api.paperfox.top`
```
# HTTP → HTTPS
server {
  listen 80;
  server_name api.paperfox.top;
  return 301 https://$host$request_uri;
}

# HTTPS API
server {
  listen 443 ssl http2;
  server_name api.paperfox.top;

  ssl_certificate     /etc/letsencrypt/live/api.paperfox.top/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.paperfox.top/privkey.pem;

  # /app → admin (канонічний домен для адмінки)
  location ^~ /app/  { return 301 https://admin.paperfox.top$request_uri; }
  location = /app    { return 301 https://admin.paperfox.top/app/; }

  # === CORS + proxy для admin/store/auth ===
  location ~* ^/(admin|store|auth)/ {

    # Приховати upstream CORS-заголовки, щоб не дублювались
    proxy_hide_header Access-Control-Allow-Origin;
    proxy_hide_header Access-Control-Allow-Credentials;
    proxy_hide_header Access-Control-Expose-Headers;
    proxy_hide_header Access-Control-Allow-Headers;
    proxy_hide_header Access-Control-Allow-Methods;

    # Рефлектований CORS ТІЛЬКИ для наших доменів
    set $cors_origin "";
    if ($http_origin = https://admin.paperfox.top) { set $cors_origin $http_origin; }
    if ($http_origin = https://paperfox.top)       { set $cors_origin $http_origin; }
    if ($http_origin = https://www.paperfox.top)   { set $cors_origin $http_origin; }

    # Загальні CORS-заголовки — для всіх методів (будуть і на POST/GET, і на OPTIONS)
    add_header Access-Control-Allow-Origin $cors_origin always;
    add_header Access-Control-Allow-Credentials true always;
    add_header Access-Control-Expose-Headers "Set-Cookie, Authorization" always;
    add_header Vary Origin always;

    # Префлайт (дублюємо ACAO/ACAC тут, щоб 100% були у відповіді 204)
    if ($request_method = OPTIONS) {
      add_header Access-Control-Allow-Origin $cors_origin always;
      add_header Access-Control-Allow-Credentials true always;
      add_header Access-Control-Allow-Methods "GET,POST,PUT,PATCH,DELETE,OPTIONS" always;
      add_header Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With" always;
      add_header Access-Control-Max-Age 86400 always;
      add_header Vary Origin always;
      return 204;
    }

    # Проксі до Medusa
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 300;

    # Куки для крос-домену (SameSite=None; Secure)
    proxy_cookie_flags samesite=None secure;
    # Якщо директиви немає у вашій збірці nginx:
    # proxy_cookie_path / "/; SameSite=None; Secure";
  }
  # Решта — прозорий проксі
  location / {
    proxy_pass http://127.0.0.1:9000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 300;
  }
location /static/ {
  alias /home/deploy/apps/medusa-paperfox/medusa-paperfox/static/;
  access_log off;
  add_header Cache-Control "public, max-age=604800";
  try_files $uri =404;
}
}

```

paperfox.top.conf
- `nano /home/deploy/apps/medusa-paperfox/medusa-paperfox/infra/nginx/paperfox.top.conf`
- `sudo nano /etc/nginx/sites-available/paperfox.top`
```
 www → non-www (HTTPS)
server {
  listen 443 ssl http2;
  server_name www.paperfox.top;

  ssl_certificate     /etc/letsencrypt/live/paperfox.top/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/paperfox.top/privkey.pem;

  return 301 https://paperfox.top$request_uri;
}

# основний сайт (HTTPS)
server {
  listen 443 ssl http2;
  server_name paperfox.top;

  ssl_certificate     /etc/letsencrypt/live/paperfox.top/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/paperfox.top/privkey.pem;

  root /var/www/paperfox.top;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|webp|woff2?|ttf)$ {
    expires 7d;
    access_log off;
    add_header Cache-Control "public";
    try_files $uri =404;
  }
}

# HTTP → HTTPS
server {
  listen 80;
  server_name paperfox.top www.paperfox.top;
  return 301 https://$host$request_uri;
}
```

admin.paperfox.top.conf
- `nano /home/deploy/apps/medusa-paperfox/medusa-paperfox/infra/nginx/admin.paperfox.top.conf`
- `sudo nano /etc/nginx/sites-available/api.paperfox.top`
```
server {
  listen 443 ssl http2;
  server_name admin.paperfox.top;

  ssl_certificate     /etc/letsencrypt/live/admin.paperfox.top/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/admin.paperfox.top/privkey.pem;

  # редирект / → /app/
  location = / {
    return 302 /app/;
  }

  # SPA адмінки під /app/
  location ^~ /app/ {
    alias /home/deploy/apps/medusa-paperfox/medusa-paperfox/.medusa/server/public/admin/;
    index index.html;
    try_files $uri $uri/ /app/index.html;
  }

  # кеш статичних
  location ~* ^/app/.*\.(?:ico|css|js|gif|jpe?g|png|svg|webp|woff2?|ttf)$ {
    alias /home/deploy/apps/medusa-paperfox/medusa-paperfox/.medusa/server/public/admin/;
    expires 7d;
    access_log off;
    add_header Cache-Control "public";
    try_files $uri =404;
  }
}
```

---

## 6. Розгортання з нуля
Клонування репозиторію
```
git clone https://github.com/VolodymyrVlasov/PaperfoxMedusa.git
```
```
cd PaperfoxMedusa
```
Встановлення залежностей
```
npm install
```
Створення папки для статики
```
mkdir -p static
```

#### Збірка
```
npm run build
```

## 5. Запуск через PM2
```
pm2 start npm --name "medusa-api" -- run start
```
```
pm2 save
```

## 6. Активація Nginx конфігів
```
sudo ln -s /home/deploy/apps/medusa-paperfox/infra/nginx/api.paperfox.top.conf /etc/nginx/sites-enabled/
```
```
sudo ln -s /home/deploy/apps/medusa-paperfox/infra/nginx/paperfox.top.conf /etc/nginx/sites-enabled/
```
```
sudo ln -s /home/deploy/apps/medusa-paperfox/infra/nginx/admin.paperfox.top.conf /etc/nginx/sites-enabled/
```
```
sudo nginx -t && sudo systemctl reload nginx
```

---

## 7. Додатково
Оновлення коду:
```
git pull
```
```
npm install
```
```
npm run build
```
```
pm2 restart medusa-api --update-env
```
Перегляд логів:
```
pm2 logs medusa-api
```
Відновлення після перезавантаження:
```
pm2 resurrect
```

---

## 8. Результат
- API: https://api.paperfox.top
- Файли: https://api.paperfox.top/static/<filename>
- Фронтенд: https://paperfox.top
- Адмінка: https://admin.paperfox.top
