const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const url = 'mathsspot.com';

const newUrl = 'https://' + url;

const proxy = createProxyMiddleware({
    target: newUrl,
    changeOrigin: true,
    secure: true,
    logLevel: 'debug',
    router: function(req) {
        if (req.headers.host === url) {
          req.headers['X-Forwarded-For'] = ''; 
          req.headers['X-Real-IP'] = '';
          req.headers['Via'] = '';
        }
        return newUrl;
    }
});

app.use('/', proxy);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Proxy is running on port ${port}`);
});
