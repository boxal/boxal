import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import App from '../containers/app';
import AboutPage from '../containers/about-page';
import LoginPage from '../containers/login-page';

export default (
  <Route path="/" component={ App }>
    <IndexRedirect to="/login"/>
    <Route path="login" component={ LoginPage }/>
    <Route path="about" component={ AboutPage }/>
  </Route>
);
