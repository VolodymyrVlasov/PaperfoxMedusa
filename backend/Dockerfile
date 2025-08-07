# ---------- Build stage ----------
FROM node:20-alpine AS build
WORKDIR /app

# установлюємо prod-залежності
COPY package*.json ./
RUN npm ci --omit=dev

# копіюємо вихідний код і збираємо
COPY . .
RUN npm run build   # генерує dist/

# ---------- Runtime stage ----------
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# встановлюємо глобальний CLI (потрібен для "medusa start")
RUN npm install -g @medusajs/medusa-cli

# копіюємо з попереднього стаджу
COPY --from=build /app /app

# порт 9000 всередині контейнера
EXPOSE 9000

# запускаємо бекенд
CMD ["medusa", "start"]
