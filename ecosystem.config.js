module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'main',
      script: 'dist/server.bundle.js',
      env: {
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

    // hors group
    {
      name: 'hors',
      script: 'dist/server.bundle.js',
      env: {
        INSTANCE: 'hors',
        PORT: 3010,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },

    // hors group
    {
      name: 'happiness',
      script: 'dist/server.bundle.js',
      env: {
        INSTANCE: 'happiness',
        PORT: 3011,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
