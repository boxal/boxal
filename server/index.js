require('babel-register')({});
const doStuff = require('./scraper');

const winston = require('winston');
const http = require('http');
const app = require('./app').default;
const server = http.createServer(app);
const httpIO = require('socket.io')(server);
const C = require('../src/constants');

const PORT = process.env.PORT;

// Start up the server.
server.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}!`);
});

httpIO.on('connection', (socket) => {
  socket.on('action', (action) => {
    if (action.type === C.SOCKET_ACTIONS.SCRAPE_ALBUM_IMAGES) {
      doStuff(action.payload.url.dropboxLink).subscribe((data) => {
        socket.emit('action', {
          type: C.SOCKET_ACTIONS.ALBUM_IMAGE_SRCSET,
          payload: {
            srcset: data,
            dropboxLink: action.payload.url.dropboxLink,
          },
        });
      });
    }
  });
});
