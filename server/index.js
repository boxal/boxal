require('babel-register')({});
const httpIO = require('socket.io')(9000);
const doStuff = require('./scraper');

const winston = require('winston');
const app = require('./app').default;

const PORT = process.env.PORT;

// Start up the server.
app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}!`);
});

httpIO.on('connection', (socket) => {
  socket.on('album-link', (url) => {
    doStuff(url).subscribe((data) => {
      socket.emit({
        srcset: data,
      });
    });
  })
});
