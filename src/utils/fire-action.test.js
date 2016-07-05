import fireAction from './fire-action';
import test from 'ava';


const INITIAL_STATE = {
  test: false,
};

const mockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'test':
      state.test = true;
      return state;

    default:
      return state;
  }
};

test('it should fire the provided action against the provided reducer', (assert) => {
  const state = fireAction(mockReducer, INITIAL_STATE, 'test');
  assert.truthy(state.test);
});
