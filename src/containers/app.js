import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Content from '../components/content';
import Container from '../components/container';
import Button from '../components/button';

const App = ({ children, session }) => {
  const token = session.get('token', false);
  const isLoggedIn = token && token !== null && typeof token !== 'undefined';
  const firstName = session.getIn(['user', 'firstName'], '');
  const lastName = session.getIn(['user', 'lastName'], '');

  return (
    <Container size={4} center>
      <Content isVisible={!isLoggedIn}>
        <div>
          <h2 className="caps">Login to Boxal</h2>
          <a href="/api/auth/facebook">
            <Button>
              <p>Login via Facebook</p>
            </Button>
          </a>
        </div>
      </Content>
      <Content isVisible={isLoggedIn}>
        <section>
          Hello, {firstName} {lastName}!!
          {children}
        </section>
      </Content>
    </Container>
  );
};

App.propTypes = {
  children: PropTypes.node,
  session: React.PropTypes.object,
  login: React.PropTypes.func,
  logout: React.PropTypes.func,
};

export default connect(
  mapStateToProps,
)(App);

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}
