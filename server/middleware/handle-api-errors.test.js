import test from 'ava';
import express from 'express';
import supertest from 'supertest';
import handleAPIErrors from './handle-api-errors';

test('should forward non-joi errors as 500 errors', async (assert) => {
  const error = {};
  const response = await request({ error });
  assert.is(response.status, 500);
});

test('should forward non-joi errors in the reponse body', async (assert) => {
  const error = { message: 'Non-joi error!' };
  const response = await request({ error });
  assert.deepEqual(response.body.error, error);
});

test('should forward joi errors with 400 status', async (assert) => {
  const error = {
    isJoi: true,
    name: 'Validation Error',
    details: [{}],
    _object: {},
  };
  const response = await request({ error });
  assert.is(response.status, 400);
});

test('should transform joi errors before forwarding them', async (assert) => {
  const name = 'Validation Error';
  const message = 'Missing property "dropboxLink" in object';
  const object = { dropboxLin: 'link' };
  const error = {
    isJoi: true,
    details: [{ message }],
    _object: object,
    name,
  };
  const response = await request({ error });
  assert.deepEqual(response.body.error, { name, message, object });
});

function request({ error }) {
  const app = express();
  app.get('/', (req, res, next) => next(error));
  app.use(handleAPIErrors());
  return supertest(app).get('/');
}
