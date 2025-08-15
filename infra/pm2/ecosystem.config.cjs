
// infra/pm2/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "medusa-api",
      cwd: "/home/deploy/apps/medusa-paperfox",
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
      host: "paperfox",        // або IP
      ref: "origin/main",
      repo: "git@github.com:VolodymyrVlasov/PaperfoxMedusa.git",
      path: "/home/deploy/apps/medusa-paperfox",
      "post-deploy": [
        "npm ci",
        "npm run build",
        "npm run buildStaticSite",
        "pm2 startOrReload infra/pm2/ecosystem.config.cjs --only medusa-api --env production"
      ].join(" && ")
    }
  }
}