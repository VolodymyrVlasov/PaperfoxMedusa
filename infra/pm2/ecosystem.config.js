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
      user: "deploy",
      host: "vps-51344",
      ref: "origin/main",
      repo: "git@github.com:VolodymyrVlasov/PaperfoxMedusa.git",
      path: "/home/deploy/apps/medusa-paperfox",
      "pre-deploy-local": "",
      "post-deploy": "npm ci && npm run build && pm2 reload ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
