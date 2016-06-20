export default function checkAuthorizationToken() {
  return (request, response, next) => {
    if (! request.headers.authorization) {
      response.statusCode = 401;
      response.json({
        status: 'error',
        data: 'No token specified in Authorization header',
      });
    } else {
      next();
    }
  };
}
