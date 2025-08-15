
// infra/pm2/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "medusa-api",
      cwd: "/home/deploy/apps/medusa-paperfox/medusa-paperfox",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 9000,
      },
      autorestart: true,
      max_memory_restart: "512M",
      time: true,
    },
  ],

  deploy: {
    production: {
      // ДАНІ ДО СЕРВЕРА
      user: "deploy",
      host: "vps-51344",        // або IP
      ref: "origin/main",
      repo: "git@github.com:VolodymyrVlasov/PaperfoxMedusa.git",
      path: "/home/deploy/apps/medusa-paperfox",
      // ЩО ВИКОНАТИ ПІСЛЯ ВИТЯГУ КОДУ
      "post-deploy": [
        "npm ci",
        "npm run build",
        "npm run builStaticSite",
        // "cd apps/site-src && npm ci && npx gulp build",
        "pm2 startOrReload infra/pm2/ecosystem.config.cjs --only medusa-api --env production"
      ].join(" && ")
    }
  }
}