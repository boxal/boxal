import React, { PropTypes } from 'react';
import * as ReactRedux from 'react-redux';
import * as ReactRouter from 'react-router';
import Navigator from '../components/ui/navigator';
import NavigatorItem from '../components/ui/navigator-item';

const Navbar = ({
  isLoggedIn = false,
}) => {
  return (
    <Navigator>
      <NavigatorItem>
        <ReactRouter.Link to="/albums">
          Albums
        </ReactRouter.Link>
      </NavigatorItem>
      <NavigatorItem ml isVisible={! isLoggedIn}>
        <a href="/api/auth/facebook">
          <button className="btn btn-primary">Login!</button>
        </a>
      </NavigatorItem>
    </Navigator>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export { Navbar as Component };

export default ReactRedux.connect(
  mapStateToProps,
)(Navbar);

function mapStateToProps(state) {
  return {
    isLoggedIn: !! state.session.get('token'),
  };
}
