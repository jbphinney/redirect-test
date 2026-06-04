const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const GATSBY_PORT = 4000;
const GATSBY_TARGET = `http://localhost:${GATSBY_PORT}`;

// Redirect rules
const REDIRECTS = {
  '/redirect-test-one/': '/redirect-test-two/',
};

// Redirect middleware - executes before proxying
app.use((req, res, next) => {
  const destination = REDIRECTS[req.path];

  if (destination) {
    console.log(`[REDIRECT] 301: ${req.path} -> ${destination}`);
    return res.redirect(301, destination);
  }

  next();
});

// Proxy middleware for all other requests
app.use(
  '/',
  createProxyMiddleware({
    target: GATSBY_TARGET,
    changeOrigin: true,
    ws: true,
    onError: (err, req, res) => {
      console.error(`[PROXY ERROR] ${err.message}`);
      if (!res.headersSent) {
        res.status(503).send('Gatsby server not ready. Please wait a moment and refresh.');
      }
    },
    onProxyReq: (proxyReq, req) => {
      console.log(`[PROXY] ${req.method} ${req.path} -> ${GATSBY_TARGET}${req.path}`);
    },
  })
);

app.listen(PORT, () => {
  console.log(`\n🚀 Proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Forwarding to Gatsby at ${GATSBY_TARGET}`);
  console.log(`🔀 Active redirects: ${Object.keys(REDIRECTS).length}\n`);
});
