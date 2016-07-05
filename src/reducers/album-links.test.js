import * as I from 'immutable';
import reducer from './album-links';
import test from 'ava';
import * as ActionCreators from '../action-creators/album';

test('should default the state to a map with albumLinks', (assert) => {
  const state = getInitialState();
  assert.truthy(I.is(state.get('albumLinks'), I.List()));
});

test('should add an album link to the initial state', (assert) => {
  const link = 'horse';
  const action = ActionCreators.addAlbumLink(link);
  const state = reducer(getInitialState(), action);
  assert.is(link, state.getIn(['albumLinks', 0]));
});

test('should not dedupe album links before adding to state', (assert) => {
  const link = 'horse';
  const action = ActionCreators.addAlbumLink(link);
  const state = reducer(getInitialState(), action);
  const state2 = reducer(state, action);
  assert.is(link, state2.getIn(['albumLinks', 0]));
  assert.is(link, state2.getIn(['albumLinks', 1]));
});

function getInitialState() {
  return reducer(undefined, { type: Symbol() });
}
