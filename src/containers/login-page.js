import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/container';

function LoginPage() {
  return (
    <Container size={4} center>
      <h2 className="caps">Login to Boxal</h2>
      <div
        className="fb-login-button"
        data-max-rows="1"
        data-size="xlarge"
        data-show-faces="false"
        data-auto-logout-link="false"
        onLogin={() => checkLoginState()}></div>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

function checkLoginState() {
  FB.getLoginStatus((response) => {
    statusChangeCallback(response);
  });
}
