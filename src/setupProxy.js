const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target:
        'https://us-central1-petshop-mern-api-c2d07.cloudfunctions.net/app',
      changeOrigin: true,
    })
  );
};
