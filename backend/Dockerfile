FROM node:20-bullseye AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --include=optional --legacy-peer-deps
COPY . .
RUN npx medusa build
FROM node:20-bullseye
WORKDIR /app
ENV NODE_ENV=production
RUN npm i -g @medusajs/medusa-cli
COPY --from=build /app /app
RUN npm prune --omit=dev

EXPOSE 9000
CMD ["medusa", "start"]

