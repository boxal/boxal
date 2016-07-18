import fireAction from '../utils/fire-action';
import sessionReducer from '../reducers/session';
import test from 'ava';
import * as I from 'immutable';

import * as C from '../../src/constants';

const {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} = C.AUTH_ACTIONS;

import { Map } from 'immutable';

test('initial state should be a map', (assert) => {
  assert.truthy(Map.isMap(getInitialState()));
});

test('on LOGIN_USER_PENDING should set loading to true', (assert) => {
  const state = fireAction(sessionReducer, getInitialState(), LOGIN_USER_PENDING);
  assert.truthy(state.get('isLoading'));
  assert.is(state.get('token'), null);
});

test('on LOGIN_USER_SUCCESS should save the username', (assert) => {
  const state = fireAction(sessionReducer, getInitialState(), LOGIN_USER_SUCCESS, { token: 1234 });

  assert.falsy(state.get('isLoading'));
  assert.falsy(state.get('hasError'));
  assert.is(state.get('token'), 1234);
});

test('on LOGIN_USER_ERROR should make "hasError" true and "isLoading" false', (assert) => {
  const state = fireAction(sessionReducer, getInitialState(), LOGIN_USER_ERROR);

  assert.falsy(state.get('isLoading'));
  assert.truthy(state.get('hasError'));
});

test('on LOGOUT_USER should reset the state', (assert) => {
  const initialState = getInitialState();
  const state = fireAction(sessionReducer, getInitialState(), LOGOUT_USER);
  assert.truthy(I.is(initialState, state));
});

function getInitialState() {
  return fireAction(sessionReducer, undefined, Symbol());
}
