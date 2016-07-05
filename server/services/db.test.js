import test from 'ava';
import * as td from 'testdouble';
import proxyquire from 'proxyquire';

test('should be a monk db instance connecting to "localhost/boxal"', () => {
  const { deps: { monk } } = requireDb();
  td.verify(monk('localhost/boxal'));
});

function requireDb() {
  const monk = td.function();
  const db = proxyquire('./db', { monk });
  return {
    db,
    deps: { monk },
  };
}
