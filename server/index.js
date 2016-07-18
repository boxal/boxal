require('babel-register')({});

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
