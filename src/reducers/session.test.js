import assert from 'assert';
import fireAction from '../utils/fire-action';
import sessionReducer from '../reducers/session';

import { AUTH } from '../../src/constants/index';

const {
  LOGIN_USER_PENDING,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
} = AUTH;

import { Map } from 'immutable';

describe('Session Reducer', () => {
  describe('inital state', () => {
    it('should be a Map', () => {
      const state = sessionReducer(undefined, {});
      assert.strictEqual(Map.isMap(state), true);
    });
  });

  describe('on LOGIN_USER_PENDING', () => {
    it('should set loading to true', () => {
      const state = fireAction(sessionReducer, state, LOGIN_USER_PENDING);
      assert(state.get('isLoading'));
      assert(state.get('token') === null);
    });
  });

  describe('on LOGIN_USER_SUCCESS', () => {
    it('should save the username', () => {
      const state = fireAction(sessionReducer, state, LOGIN_USER_SUCCESS, { token: 1234 });

      assert(!state.get('isLoading'));
      assert(!state.get('hasError'));
      assert(state.get('token') === 1234);
    });
  });

  describe('on LOGIN_USER_ERROR', () => {
    it('should save the username', () => {
      const state = fireAction(sessionReducer, state, LOGIN_USER_ERROR);

      assert(!state.get('isLoading'));
      assert(state.get('hasError'));
    });
  });


  describe('on LOGOUT_USER', () => {
    it('should save the username', () => {
      const state = fireAction(sessionReducer, state, LOGOUT_USER);

      assert(!state.get('isLoading'));
      assert(!state.get('hasError'));
      assert(state.get('token') === null);
    });
  });
});
