import nodeFetch from 'node-fetch';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  throw Object.assign(error, { response });
}

export function parseJSON(response) {
  return response.json();
}

export default function fetch(...args) {
  return nodeFetch(...args).then(checkStatus).then(parseJSON);
}
