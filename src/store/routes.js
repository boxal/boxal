import React from 'react';
import { browserHistory, Router, Route } from 'react-router';
import { push } from 'react-router-redux';
import App from '../containers/app';
import * as AuthActionCreators from '../action-creators/auth';
import AlbumLinksPage from '../containers/album-links-page';

/**
 * Required because dispatching `push('/')` doesn't work without it.
 * Wrap `onEnter` functions using this function to make them execute
 * asynchronously.
 *
 * @example
 * const asyncEnsureLoggedIn = a$ync(ensureLoggedIn);
 */
import a$ync from '../utils/a$ync';

export default (store) => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="" component={() => <div/>}/>
      <Route path="login/facebook" onEnter={() => login(store)}/>
      <Route path="albums" onEnter={() => a$ync(ensureLoggedIn)(store)} component={AlbumLinksPage}/>
    </Route>
  </Router>
);

export function login(store) {
  const currentState = store.getState();
  const {
    routing: {
      locationBeforeTransitions: {
        query: {
          access_token: accessToken,
          display_name: displayName,
        },
      },
    },
  } = currentState;

  if (accessToken && displayName) {
    const names = displayName.split(' ');
    const user = {
      firstName: names[0],
      lastName: names[1],
    };
    store.dispatch(AuthActionCreators.loginUser(user, accessToken));
  }

  return store.dispatch(push('/'));
}

export function ensureLoggedIn(store) {
  const { session } = store.getState();
  if (! session.get('token')) {
    store.dispatch(push('/'));
  }
}
