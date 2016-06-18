import express from 'express';
import winston from 'winston';
import helmet from 'helmet';
import nodeProxy from './node-proxy';
import nodeAppServer from './node-app-server';
import bodyParser from 'body-parser';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import * as SECRETS from './constants/secrets.js';

/**
 * Heroku-friendly production http server.
 *
 * Serves your app and allows you to proxy APIs if needed.
 */

const app = express();
const PORT = process.env.PORT || 8080;

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
    response.redirect('/auth/facebook?access_token=' + request.user.token
     + '&display_name=' + request.user.displayName);
  }
);

// API proxy logic: if you need to talk to a remote server from your client-side
// app you can proxy it though here by editing ./proxy-config.js
nodeProxy(app);

// Serve the distributed assets and allow HTML5 mode routing. NB: must be last.
nodeAppServer(app);

// Start up the server.

export { app as app };

export function startServer() {
  app.listen(PORT, (err) => {
    if (err) {
      winston.error(err);
      return;
    }

    winston.info(`Listening on port ${PORT}`);
  });
}
