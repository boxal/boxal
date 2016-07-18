require('babel-polyfill');
const requireHacker = require('require-hacker');

[ 'png',
  'jpg',
  'jpeg',
  'gif',
  'woff',
  'woff2',
  'ttf',
  'eot',
  'css',
  'svg',
].forEach((type) => {
  requireHacker.hook(type, () => 'module.exports = ""');
});

const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

window.localStorage = createLocalStorage();
window.fetch = () => {};

Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

function createLocalStorage() {
  const cache = {};
  return {
    setItem(name, item) {
      cache[name] = String(item);
    },
    getItem(name) {
      return cache.hasOwnProperty(name) ? cache[name] : null;
    },
  };
}
