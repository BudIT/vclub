const fs = require('fs');
const path = require('path');
const express = require('express');
const { exec } = require('child_process');
// eslint-disable-next-line import/no-extraneous-dependencies
const httpProxy = require('http-proxy');


const httpPort = process.env.PORT || 3000;
const sslPort = process.env.SSL_PORT || 3443;
const targetPort = process.env.TARGET_PORT || 3080;

const proxy = httpProxy.createServer({
  target: {
    host: 'localhost',
    port: targetPort,
  },
  ws: true,
  ssl: {
    key: fs.readFileSync(path.resolve(__dirname, 'file.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'file.crt')),
  },
});

const fallbackApp = express();
// const fallbackServer = http.createServer(fallbackApp);

fallbackApp.get('*', (req, res) => {
  res.redirect(`https://localhost:${sslPort}${req.url}`);
});

fallbackApp.listen(httpPort, () => {
  process.stdout.write(`The fallback server is running at http://localhost:${httpPort}\n`);
});

proxy.listen(sslPort, () => {
  process.stdout.write(`Proxy is started at https://localhost:${sslPort}\n`);
});

const realServerProc = exec('npm start', {
  env: Object.assign({}, process.env, {
    PORT: targetPort,
  }),
}, error => {
  if (error) {
    process.stderr.write(`exec error: ${error}\n`);
  }
});

realServerProc.stdout.on('data', data => {
  process.stdout.write(data);
});
