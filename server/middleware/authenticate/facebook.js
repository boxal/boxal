import * as FacebookUtils from '../../utils/facebook';
import * as Logger from '../../utils/log';

function getToken(request) {
  const { authorization = '' } = request.headers;
  return authorization.replace('bearer ', '');
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
        Logger.error(error);
        response.statusCode = 401;
        response.json({
          status: 'error',
          data: 'Failed to authenticate with facebook.',
        });
      });
  };
}

export default authenticate;
