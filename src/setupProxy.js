import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  console.log('Sss');
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000', // Replace with your server URL
      changeOrigin: true,
      secure: false
    })
  );
}
