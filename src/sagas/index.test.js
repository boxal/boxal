import test from 'ava';
import saga from './index';

test('should do nothing', (assert) => {
  const iterator = saga();
  assert.truthy(iterator.next().done);
});
