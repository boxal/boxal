import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import App from '../containers/app';
import AboutPage from '../containers/about-page';
import LoginPage from '../containers/login-page';

export default (store) => (
  <Route onEnter={checkAuth(store)} path="/" component={ App }>
    <IndexRedirect to="/about"/>
    <Route path="login" component={ LoginPage }/>
    <Route path="about" component={ AboutPage }/>
  </Route>
);


function checkAuth(store) {
  return () => {
    return FB.getLoginStatus((response) => statusChangeCallback(store, response));
  };
}

function testAPI() {
  console.log('Oh HEY Welcome!  Fetching your information.... ');
  FB.api('/me', (response) => {
    console.log('Successful login for: ' + response.name);
  });
}

function statusChangeCallback(store, response) {
  console.log(response);
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    console.log('Person is logged into FB & Boxal!');
    testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log('Person is logged into FB but not Boxal!');
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    console.log('Person is not logged into FB!');
  }
}
