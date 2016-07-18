import test from 'ava';
import * as td from 'testdouble';
import fetchAccessToken from './fetch-access-token';

test('should return undefined, if the session does not exist', (assert) => {
  const getItem = td.replace(window.localStorage, 'getItem');
  td.when(getItem('boxal')).thenReturn(null);
  const token = fetchAccessToken();
  assert.is(token, undefined);
});

test('should return the token, if it exists in the session', (assert) => {
  const getItem = td.replace(window.localStorage, 'getItem');
  td.when(getItem('boxal')).thenReturn('{ "token": "123456" }');
  const token = fetchAccessToken();
  assert.is(token, '123456');
});

test('should return undefined, if the token does not exist in the session', (assert) => {
  const getItem = td.replace(window.localStorage, 'getItem');
  td.when(getItem('boxal')).thenReturn('{}');
  const token = fetchAccessToken();
  assert.is(token, undefined);
});

test.afterEach(() => {
  td.reset();
});
