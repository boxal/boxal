import test from 'ava';
import * as I from 'immutable';
import * as td from 'testdouble';
import { ensureLoggedIn, login } from './routes';
import { push } from 'react-router-redux';
import * as AuthActionCreators from '../action-creators/auth';

test('"ensureLoggedIn" should redirect the user to "/", if the token does not exist', () => {
  const session = I.Map({});
  const dispatch = td.function();
  const store = {
    getState: () => ({ session }),
    dispatch,
  };
  ensureLoggedIn(store);
  td.verify(dispatch(push('/')));
});

test('"ensureLoggedIn" should do no redirects, if the token exists', (assert) => {
  const session = I.Map({ token: '123' });
  const dispatch = td.function();
  const store = {
    getState: () => ({ session }),
    dispatch,
  };
  ensureLoggedIn(store);
  assert.throws(() => td.verify(dispatch(td.matchers.anything())));
});

test('"login" should save user token and name, if they exist in the querystring', () => {
  const accessToken = '1234';
  const firstName = 'John';
  const lastName = 'Doe';
  const displayName = `${firstName} ${lastName}`;
  const state = {
    routing: {
      locationBeforeTransitions: {
        query: {
          access_token: accessToken,
          display_name: displayName,
        },
      },
    },
  };

  const store = {
    getState: () => state,
    dispatch: td.function(),
  };

  login(store);

  td.verify(store.dispatch(AuthActionCreators.loginUser({ firstName, lastName }, accessToken)));
});

test('"login" should redirect to "/", if token doesn\'t exist in querystring', () => {
  const firstName = 'John';
  const lastName = 'Doe';
  const displayName = `${firstName} ${lastName}`;
  const state = {
    routing: {
      locationBeforeTransitions: {
        query: {
          display_name: displayName,
        },
      },
    },
  };

  const store = {
    getState: () => state,
    dispatch: td.function(),
  };

  login(store);

  td.verify(store.dispatch(push('/')));
});

test('"login" should redirect to "/", if "displayName" doesn\'t exist in querystring', () => {
  const accessToken = '123';
  const state = {
    routing: {
      locationBeforeTransitions: {
        query: {
          access_token: accessToken,
        },
      },
    },
  };

  const store = {
    getState: () => state,
    dispatch: td.function(),
  };

  login(store);

  td.verify(store.dispatch(push('/')));
});
