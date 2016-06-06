import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/container';

function LoginPage() {
  return (
    <Container size={4} center>
      <h2 className="caps">Login</h2>
      <p>
        Login via Facebook
      </p>
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
