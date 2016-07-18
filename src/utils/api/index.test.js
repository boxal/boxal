import test from 'ava';
import * as td from 'testdouble';

test('"request" should call fetch with the decorated options and the url', () => {
  const { request, deps: { fetch, fetchAccessToken } } = requireAPI();
  const url = 'http://localhost:3000';
  const token = '123456';
  td.when(fetchAccessToken()).thenReturn(token);
  request(url, {});
  td.verify(fetch(url, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }));
});

test('"request" should default the options object to an empty map', () => {
  const { request, deps: { fetchAccessToken } } = requireAPI();
  const url = 'http://localhost:3000';
  const token = '123456';
  td.when(fetchAccessToken()).thenReturn(token);
  request(url, undefined);
  td.verify(fetch(url, {
    headers: {
      Authorization: `bearer ${token}`,
    },
  }));
});

test('"request" should reject all responses that have a non-200 status code', async () => {
  const { request, deps: { checkStatus } } = requireAPI();
  await request();
  td.verify(checkStatus(td.matchers.anything()));
});

test('"request" should convert all response bodies to JavaScript objects', async () => {
  const { request, deps: { parseJSON } } = requireAPI();
  await request();
  td.verify(parseJSON(td.matchers.anything()));
});

test('"post" should send a POST request', () => {
  const { post, deps: { fetch } } = requireAPI();
  const url = '123';
  post(url, {});
  td.verify(fetch(url, td.matchers.contains({ method: 'POST' })));
});

test('"post" should send the stringified post body', () => {
  const { post, deps: { fetch } } = requireAPI();
  const body = { dropboxLink: '123' };
  const url = '123';
  post(url, body);
  td.verify(fetch(url, td.matchers.contains({ body: JSON.stringify(body) })));
});

test('"post" should send a request accepting a json reply', () => {
  const { post, deps: { fetch } } = requireAPI();
  const url = '123';
  post(url, {});
  td.verify(fetch(url, td.matchers.contains({
    headers: {
      'Accept': 'application/json',
    },
  })));
});

test('"post" should send a request specifying a json content-type', () => {
  const { post, deps: { fetch } } = requireAPI();
  const url = '123';
  post(url, {});
  td.verify(fetch(url, td.matchers.contains({
    headers: {
      'Content-Type': 'application/json',
    },
  })));
});

test('"get" should send a GET request', () => {
  const { get, deps: { fetch } } = requireAPI();
  const url = '123';
  get(url, {});
  td.verify(fetch(url, td.matchers.contains({ method: 'GET' })));
});

test('"get" should send a request accepting a json reply', () => {
  const { get, deps: { fetch } } = requireAPI();
  const url = '123';
  get(url, {});
  td.verify(fetch(url, td.matchers.contains({
    headers: {
      'Accept': 'application/json',
    },
  })));
});


function requireAPI() {
  const fetchAccessToken = td.replace('../fetch-access-token', td.function());
  const parseJSON = td.replace('./parse-json', td.function());
  const checkStatus = td.replace('./check-status', td.function());
  const fetch = td.replace(global, 'fetch');
  td.when(fetch(td.matchers.anything(), td.matchers.anything())).thenReturn(Promise.resolve());
  const API = require('./index');
  return {
    ...API,
    deps: {
      fetch,
      fetchAccessToken,
      parseJSON,
      checkStatus,
    },
  };
}
