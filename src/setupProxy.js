const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://petshop-mern--api.herokuapp.com',
      changeOrigin: true,
    })
  );
};
