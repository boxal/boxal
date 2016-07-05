import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import authenticate from './middleware/authenticate/facebook';
import checkAuthorizationToken from './middleware/check-authorization-token';
import handleAPIErrors from './middleware/handle-api-errors';

import * as SECRETS from './constants/secrets.js';
import resources from './resources';

const app = express();

// Enable various security helpers.
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());

passport.use(new FacebookStrategy({
  clientID: SECRETS.FACEBOOK.CLIENT_ID,
  clientSecret: SECRETS.FACEBOOK.CLIENT_SECRET,
  callbackURL: SECRETS.FACEBOOK.CALLBACK_URL,
},
  (accessToken, refreshToken, profile, done) => {
    return done(null, Object.assign(profile, { token: accessToken }));
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/me', checkAuthorizationToken(), authenticate(), (request, response) => {
  response.json(request.user);
});

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  (request, response) => {
    const { token, displayName } = request.user;
    response.redirect(
      `/login/facebook?access_token=${token}&display_name=${displayName}`
   );
  }
);

app.use('/', resources);

app.use(handleAPIErrors());

export default app;
