import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const App = ({ children }) => {
  return (
    <section>
      {children}
    </section>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}
