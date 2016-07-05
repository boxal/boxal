import test from 'ava';
import checkAuthorizationToken from './check-authorization-token';
import express from 'express';
import supertest from 'supertest';

test('should reject with 401, if authorization header isn\'t present', async (assert) => {
  const response = await request();
  assert.is(response.status, 401);
});

test('should reject with a message, if authorization header isn\'t present', async (assert) => {
  const response = await request();

  [/no/i, /token/i, /in/i, /authorization/i, /header/i].forEach((regex) => {
    assert.regex(response.body.data, regex);
  });
});

test('should yield to next middleware, if Authorization header is present', async (assert) => {
  const response = await request({
    headers: {
      Authorization: 'bearer 123',
    },
  });

  assert.is(response.body.status, 'done!');
});

test('should yield to next middleware, if authorization token is malformed', async (assert) => {
  const response = await request({
    headers: {
      Authorization: 'aksjdflkajsdfl',
    },
  });

  assert.is(response.body.status, 'done!');
});

test('should yield to next middleware, if authorization header is malformed', async (assert) => {
  const response = await request({
    headers: {
      AuTHoriZaTIon: 'bearer horse',
    },
  });

  assert.is(response.body.status, 'done!');
});

function request({ headers = {} } = {}) {
  const app = express();
  app.get('/', checkAuthorizationToken(), (_, res) => res.json({ status: 'done!' }));
  return Object.keys(headers).reduce((req, key) => {
    return req.set(key, headers[key]);
  }, supertest(app).get('/'));
}
