module.exports = {
  apps: [
    {
      name: "medusa-api",
      cwd: "/home/deploy/apps/medusa-paperfox/current",
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
      user: "deploy",
      host: "paperfox", // або IP
      ref: "origin/main",
      repo: "git@github.com:VolodymyrVlasov/PaperfoxMedusa.git",
      path: "/home/deploy/apps/medusa-paperfox",
      "post-deploy": [
        "npm ci",
        "npm run build",
        "npm run buildStaticSite",
        "pm2 startOrReload infra/pm2/ecosystem.config.cjs --only medusa-api --env production --update-env",
      ].join(" && "),
    },
  },

  "post-deploy": [
    "cd /home/deploy/apps/medusa-paperfox/current",
    "npm ci",
    "npm run build",
    "npm run buildStaticSite",
    "pm2 startOrReload /home/deploy/apps/medusa-paperfox/current/infra/pm2/ecosystem.config.cjs --only medusa-api --env production --update-env",
  ].join(" && "),
};
