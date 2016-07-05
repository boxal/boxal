import test from 'ava';
import * as td from 'testdouble';
import express from 'express';
import supertest from 'supertest';

const FACEBOOK_USERS = {
  ['123456']: { name: 'Ramanpreet Nara' },
};

test('should fetch the facebook user', async (assert) => {
  const { request } = createApp();
  const token = '123456';
  const user = FACEBOOK_USERS[token];
  const response = await request().set('Authorization', `bearer ${token}`);
  assert.deepEqual(response.body, user);
});

test('should ignore case in the Authorization header', async (assert) => {
  const { request } = createApp();
  const token = '123456';
  const user = FACEBOOK_USERS[token];
  const response = await request().set('auThorIzaTiON', `bearer ${token}`);
  assert.deepEqual(response.body, user);
});

test('should reject with a 401, if the Authorization header is not sent', async (assert) => {
  const { request } = createApp();
  const response = await request();
  assert.is(response.status, 401);
});

test('should reject with a 401, if an invalid token is sent', async (assert) => {
  const { request } = createApp();
  const response = await request().set('Authorization', 'bearer horse');
  assert.is(response.status, 401);
});

test('should reject with a 401, if an invalid Authorization header is sent', async (assert) => {
  const { request } = createApp();
  const response = await request().set('Authorization', 'bearer horse');
  assert.is(response.status, 401);
});

test('should reject with a 401, if an invalid Authorization header is sent', async (assert) => {
  const { request } = createApp();
  const response = await request().set('Authorization', 'bearer horse');
  assert.is(response.status, 401);
});

test('should reject with a informative message, if Auth fails', async (assert) => {
  const { request } = createApp();
  const response = await request().set('Authorization', 'bearer horse');
  [/failed/i, /auth/i, /facebook/i].forEach((keyword) => {
    assert.regex(response.body.data, keyword);
  });
});

test('should log the authentication error, if Auth fails', async (assert) => {
  const { request, dependencies: { Logger } } = createApp();
  await request().set('Authorization', 'bearer horse');
  assert.notThrows(() => td.verify(Logger.error(td.matchers.isA(Error))));
});

function createApp() {
  const FacebookUtils = td.replace('../../utils/facebook');
  const error = reject(new Error('Not found'));
  td.when(FacebookUtils.fetchUser(td.matchers.anything())).thenReturn(error);
  Object.keys(FACEBOOK_USERS).forEach((name) => {
    td.when(FacebookUtils.fetchUser(name)).thenReturn(resolve(FACEBOOK_USERS[name]));
  });

  const Logger = td.replace('../../utils/log');
  const authenticate = require('./facebook').default;
  const app = express();
  app.get('/', authenticate(), (_, r) => r.send(_.user));
  return {
    dependencies: { FacebookUtils, Logger },
    misc: { error },
    request: () => supertest(app).get('/'),
  };
}

function reject(x) {
  const rejected = Promise.reject(x);
  /**
   * @description
   * Necessary. Otherwise bluebird will sometimes report 'Unhandled Rejection'.
   */
  rejected.catch(() => {});
  return rejected;
}

function resolve(x) {
  return Promise.resolve(x);
}
