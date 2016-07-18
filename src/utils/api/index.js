import decorateWithAccessToken from './decorate-with-access-token';
import parseJSON from './parse-json';
import checkStatus from './check-status';

export function request(url, options = {}) {
  return fetch(url, decorateWithAccessToken(options))
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, body) {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function get(url) {
  return request(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
}
