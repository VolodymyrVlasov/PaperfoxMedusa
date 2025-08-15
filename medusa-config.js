// import { loadEnv, defineConfig } from "@medusajs/framework/utils"
// loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// export default defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     databaseDriverOptions: { ssl: false },
//     redisUrl: process.env.REDIS_URL,
//     http: {
//       storeCors: process.env.STORE_CORS,
//       adminCors: process.env.ADMIN_CORS,
//       authCors: process.env.AUTH_CORS || process.env.ADMIN_CORS,
//       jwtSecret: process.env.JWT_SECRET || 'supersecret',
//       cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
//     },
//   },
//   // v2: модулі задаються масивом, file-модуль + local-провайдер
//   modules: [
//     {
//       resolve: "@medusajs/medusa/file",
//       options: {
//         providers: [
//           {
//             resolve: "@medusajs/medusa/file-local",
//             id: "local",
//             options: {
//               upload_dir: "static",
//               backend_url: "https://api.paperfox.top/static",
//             },
//           },
//         ],
//       },
//     },
//   ],
// })

// medusa-config.js (ESM)
import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: { ssl: false },
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS || process.env.ADMIN_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
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