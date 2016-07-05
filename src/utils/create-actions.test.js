import test from 'ava';
import createActions from './create-actions';

test('should add a namespace to all actions created', (assert) => {
  const namespace = 'ns';
  const actions = createActions(namespace, [ 'one' ]);
  assert.regex(actions.one, new RegExp(namespace));
});

test('should dedupe actions', (assert) => {
  const namespace = 'ns';
  const actions = createActions(namespace, [ 'one', 'one' ]);
  const keys = Object.keys(actions);
  assert.is(keys.length, 1);
});
