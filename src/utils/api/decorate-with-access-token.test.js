import test from 'ava';
import * as td from 'testdouble';

test('should decorate an empty object with the Authorization header', (assert) => {
  const { decorateWithAccessToken, deps: { fetchAccessToken } } = requireDecorateWithAccessToken();
  const token = '123';
  td.when(fetchAccessToken()).thenReturn(token);
  const options = decorateWithAccessToken({});
  assert.is(`bearer ${token}`, options.headers.Authorization);
});

test('should attach the Authorization header to an object with existing headers', (assert) => {
  const { decorateWithAccessToken, deps: { fetchAccessToken } } = requireDecorateWithAccessToken();
  const token = '123';
  td.when(fetchAccessToken()).thenReturn(token);
  const options = decorateWithAccessToken({
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  assert.is(`bearer ${token}`, options.headers.Authorization);
  assert.is('application/json', options.headers.Accept);
  assert.is('application/json', options.headers['Content-Type']);
});

test('should throw an error if the argument is not specified', (assert) => {
  const { decorateWithAccessToken } = requireDecorateWithAccessToken();
  assert.throws(() => decorateWithAccessToken());
});

function requireDecorateWithAccessToken() {
  const fetchAccessToken = td.replace('../fetch-access-token', td.function());
  const decorateWithAccessToken = require('./decorate-with-access-token').default;
  return {
    decorateWithAccessToken,
    deps: { fetchAccessToken },
  };
}
