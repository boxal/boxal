import React from 'react';
import { browserHistory, Router, IndexRoute, Route } from 'react-router';
import { push } from 'react-router-redux';
import App from '../containers/app';
import AboutPage from '../containers/about-page';
import * as AC from '../action-creators';

export default (store) => (
  <Router history={browserHistory}>
    <Route path="/" component={ App }>
      <IndexRoute to="/about"/>
      <Route path="about" component={ AboutPage }/>
      <Route path="auth/facebook" onEnter={() => checkAuth(store)}/>
    </Route>
  </Router>
);

function checkAuth(store) {
  const currentState = store.getState();
  const { routing: {
    locationBeforeTransitions: {
      query: {
        access_token: accessToken,
        display_name: displayName,
      },
    },
  } } = currentState;

  if (accessToken && displayName) {
    const names = displayName.split(' ');
    const user = {
      firstName: names[0],
      lastName: names[1],
    };
    store.dispatch(AC.userAuthenticated(user, accessToken));
  }
  return store.dispatch(push('/'));
}
