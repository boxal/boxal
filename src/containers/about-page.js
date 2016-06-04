import React from 'react';
import { connect } from 'react-redux';

import Container from '../components/container';

function AboutPage() {
  return (
    <Container size={4} center>
      <h2 className="caps">About Us</h2>
      <p>
        Boxal is a next-generation HTML5 design and development application.
      </p>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AboutPage);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}
