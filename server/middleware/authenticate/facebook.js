import * as FacebookUtils from '../../utils/facebook';
import winston from 'winston';

function getToken(request) {
  const { authorization = 'bearer ' } = request.headers;
  return /bearer (.*)/.exec(authorization)[1];
}

function authenticate() {
  return (request, response, next) => {
    FacebookUtils
      .fetchUser(getToken(request))
      .then((user) => {
        request.user = user;
        next();
      })
      .catch((error) => {
        winston.error(error);
        response.statusCode = 401;
        response.json({
          status: 'error',
          data: 'Failed to authenticate with facebook.',
        });
      });
  };
}

export default authenticate;
