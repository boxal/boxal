import isPromise from './is-promise';
import test from 'ava';

test('should return true if a Promise is provided', (assert) => {
  const promise = Promise.resolve(true);

  const payload = {
    promise,
  };

  assert.truthy(isPromise(payload));
});

test('should return false if something that is not a Promise is provided', (assert) => {
  const badPayload1 = { hello: 'world' };
  const badPayload2 = ['hello', 'world'];
  const badPayload3 = 'hello world';
  const badPayload4 = 'hello world';

  assert.falsy(isPromise({ promise: badPayload1 }));
  assert.falsy(isPromise({ promise: badPayload2 }));
  assert.falsy(isPromise({ promise: badPayload3 }));
  assert.falsy(isPromise({ promise: badPayload4 }));
});
