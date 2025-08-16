module.exports = {
  apps: [
    {
      name: "medusa-api",
      cwd: "/home/deploy/apps/medusa-paperfox/current",
      script: "npm",
      args: "start",
      env: { NODE_ENV: "production", PORT: 9000 },
      autorestart: true,
      max_memory_restart: "512M",
      time: true,
    },
  ],

  deploy: {
    // === PROD з main ===
    production: {
      user: "deploy",
      host: "paperfox",
      ref: "origin/main",
      repo: "git@github.com:VolodymyrVlasov/PaperfoxMedusa.git",
      path: "/home/deploy/apps/medusa-paperfox",
      "pre-deploy-local": "",
      "post-deploy": [
        "cd /home/deploy/apps/medusa-paperfox/current",
        "npm ci",
        "npm run build",
        "pm2 startOrReload /home/deploy/apps/medusa-paperfox/current/infra/pm2/ecosystem.config.cjs --only medusa-api --env production",
        "pm2 save",
      ].join(" && "),
      env: { NODE_ENV: "production", PORT: 9000 },
    },

    // === PROD з deploy/test (перезаписує той самий процес/папку) ===
    production_test: {
      user: "deploy",
      host: "paperfox",
      ref: "origin/deploy/test", // <- лише гілка інша
      repo: "git@github.com:VolodymyrVlasov/PaperfoxMedusa.git",
      path: "/home/deploy/apps/medusa-paperfox", // <- та сама директорія!
      "pre-deploy-local": "",
      "post-deploy": [
        "cd /home/deploy/apps/medusa-paperfox/current",
        "npm ci",
        "npm run build",
        "pm2 startOrReload /home/deploy/apps/medusa-paperfox/current/infra/pm2/ecosystem.config.cjs --only medusa-api --env production",
        "pm2 save",
      ].join(" && "),
      env: { NODE_ENV: "production", PORT: 9000 },
    },
  },
};
