module.exports = {
  apps: [
    {
      name: "medusa-api",
      cwd: "/home/deploy/apps/medusa-paperfox/current",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 9000,
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
      "pre-deploy-local": "",
      "post-deploy": [
        // // (опціонально) підвантажити nvm, якщо PM2 запускається без профілю шелла
        // 'export NVM_DIR="$HOME/.nvm"',
        // '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" || true',

        // перейти в актуальний реліз і зібрати
        "cd /home/deploy/apps/medusa-paperfox/current",
        "npm ci",
        "npm run build",

        // старт/релод через абсолютний шлях до цього ж файлу
        // "ln -sf /home/deploy/apps/medusa-paperfox/shared/.env /home/deploy/apps/medusa-paperfox/current/.env",
        "pm2 startOrReload /home/deploy/apps/medusa-paperfox/current/infra/pm2/ecosystem.config.cjs --only medusa-api --env production",
        "pm2 save",
      ].join(" && "),
      env: {
        NODE_ENV: "production",
        PORT: 9000,
      },
    },
  },
};
