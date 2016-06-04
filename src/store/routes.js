import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import App from '../containers/app';
import AboutPage from '../containers/about-page';

export default (
  <Route path="/" component={ App }>
    <IndexRedirect to="/about"/>
    <Route path="about" component={ AboutPage }/>
  </Route>
);
