require('babel-register')({
  presets: ['node6', 'stage-0'],
});

require('./node-server').startServer();
