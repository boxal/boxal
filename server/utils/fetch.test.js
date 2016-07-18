import test from 'ava';
import * as td from 'testdouble';
import proxyquire from 'proxyquire';

test('should yield to nodeFetch', () => {
  const { fetch, deps: { nodeFetch } } = requireFetch();
  const args = [1, 2];
  fetch(...args);
  td.verify(nodeFetch(...args));
});

test('should reject responses with non 200 status', async () => {
  const { fetch, deps: { checkStatus } } = requireFetch();
  const args = [1, 2];
  await fetch(...args);
  td.verify(checkStatus(td.matchers.anything()));
});

test('should parse the responses as JSON objects', async () => {
  const { fetch, deps: { parseJSON } } = requireFetch();
  const args = [1, 2];
  await fetch(...args);
  td.verify(parseJSON(td.matchers.anything()));
});

function requireFetch() {
  const nodeFetch = td.function();
  const checkStatus = td.function();
  const parseJSON = td.function();
  td.when(nodeFetch(td.matchers.anything(), td.matchers.anything())).thenReturn(Promise.resolve());
  const { default: fetch } = proxyquire('./fetch', {
    'node-fetch': nodeFetch,
    '../../src/utils/api/check-status': { default: checkStatus },
    '../../src/utils/api/parse-json': { default: parseJSON },
  });
  return {
    fetch,
    deps: {
      nodeFetch,
      checkStatus,
      parseJSON,
    },
  };
}
