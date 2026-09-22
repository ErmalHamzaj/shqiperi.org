// PM2 process config for running Shqipëri on a VPS (e.g. Hostinger VPS).
// Usage:  pm2 start ecosystem.config.js  &&  pm2 save
module.exports = {
  apps: [
    {
      name: "shqiperi",
      script: "npm",
      args: "start",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
