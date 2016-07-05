import test from 'ava';
import { checkStatus, parseJSON } from './fetch';

test('"checkStatus" should return the response, if it has a 2xx status', (assert) => {
  const response = {
    status: 200,
  };
  assert.is(checkStatus(response), response);
});

test('"checkStatus" should throw an error if the response has a 1xx status', (assert) => {
  const response = {
    status: 199,
  };
  assert.throws(() => checkStatus(response));
});

test('"checkStatus" should throw an error if the response has a 3xx status', (assert) => {
  const response = {
    status: 300,
  };
  assert.throws(() => checkStatus(response));
});

test('"checkStatus" should throw an error if the response has a 4xx status', (assert) => {
  const response = {
    status: 400,
  };
  assert.throws(() => checkStatus(response));
});

test('"checkStatus" should throw an error if the response has a 5xx status', (assert) => {
  const response = {
    status: 500,
  };
  assert.throws(() => checkStatus(response));
});

test('"checkStatus" should forward the response "statusText" in thrown error', (assert) => {
  const statusText = 'oh no!';
  const response = {
    status: 500,
    statusText,
  };

  try {
    checkStatus(response);
  } catch (ex) {
    assert.is(statusText, ex.message);
  }
});

test('"checkStatus" should forward the response in thrown error', (assert) => {
  const response = {
    status: 500,
  };

  try {
    checkStatus(response);
  } catch (ex) {
    assert.is(response, ex.response);
  }
});

test('"parseJSON" should parse the response to a JSON object', (assert) => {
  const json = Promise.resolve({});
  const response = {
    json: () => json,
  };

  assert.is(parseJSON(response), json);
});
