import immutableToJS from './immutable-to-js';
import * as I from 'immutable';
import test from 'ava';

const mockState = {
  state: {
    name: 'John',
    sons: [{
      name: 'Lill John',
      age: 12,
    }, {
      name: 'Big John',
      age: 34,
    }],
  },
};

const stateWithImmutable = {
  state: I.fromJS(mockState.state),
};

test('should ignore regular JS structures', (assert) => {
  assert.deepEqual(mockState, immutableToJS(mockState));
});

test('should convert Immutable structures to JS structures', (assert) => {
  assert.deepEqual(mockState, immutableToJS(stateWithImmutable));
});
