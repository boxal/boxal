import test from 'ava';
import parseJSON from './parse-json';

test('"parseJSON" should parse the response to a JSON object', (assert) => {
  const json = Promise.resolve({});
  const response = {
    json: () => json,
  };

  assert.is(parseJSON(response), json);
});
