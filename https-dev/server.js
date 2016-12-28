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
  process.stdout.write(`The server is running at http://localhost:${httpPort}\n`);
});

proxy.listen(sslPort, () => {
  process.stdout.write(`Proxy is started\n`);
});

exec('npm start', {
  env: Object.assign({}, process.env, {
    PORT: targetPort,
  }),
}, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
