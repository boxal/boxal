import * as I from 'immutable';
import reducer from './album-links';
import test from 'ava';
import * as ActionCreators from '../action-creators/album';

test('should default the state to a map with albumLinks', (assert) => {
  const state = getInitialState();
  assert.truthy(I.is(state.get('albumLinks'), I.OrderedSet()));
});

test('should add an album link to the initial state', (assert) => {
  const link = 'horse';
  const action = ActionCreators.saveAlbumToStore({ dropboxLink: link });
  const state = reducer(getInitialState(), action);
  assert.is(link, state.get('albumLinks').first());
});

test('should dedupe album links before adding to state', (assert) => {
  const link = 'horse';
  const action = ActionCreators.saveAlbumToStore({ dropboxLink: link });
  const state = reducer(getInitialState(), action);
  const state2 = reducer(state, action);
  assert.is(link, state.get('albumLinks').first());
  assert.is(state2.get('albumLinks').size, 1);
});

test('should be able to save multiple albums to the store at once', (assert) => {
  const albums = [{ dropboxLink: '123' }, { dropboxLink: '234' }];
  const action = ActionCreators.saveAlbumsToStore(albums);
  const state = reducer(getInitialState(), action);
  assert.deepEqual(state.get('albumLinks').toJS(), ['123', '234']);
});

function getInitialState() {
  return reducer(undefined, { type: Symbol() });
}
