require('babel-register')({});

const winston = require('winston');
const app = require('./app').default;

const nodeProxy = require('./node-proxy');
const nodeAppServer = require('./node-app-server');

const PORT = process.env.PORT || 8080;

// API proxy logic: if you need to talk to a remote server from your client-side
// app you can proxy it though here by editing ./proxy-config.js
nodeProxy(app);

// Serve the distributed assets and allow HTML5 mode routing. NB: must be last.
nodeAppServer(app);

// Start up the server.

app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}!`);
});
