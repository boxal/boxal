import proxyquire from 'proxyquire';
import express from 'express';
import supertest from 'supertest';
import { expect } from 'chai';
import * as sinon from 'sinon';

const DEPENDENCIES = {
  FacebookUtils: '../../utils/facebook',
  winston: 'winston',
};

describe('middleware/authenticate/facebook', () => {
  it('should fetch the logged in facebook user', (done) => {
    const { server, deps: { FacebookUtils } } = createServer();
    const token = '123456';
    server
      .get('/')
      .set('Authorization', `bearer ${token}`)
      .end(() => {
        expect(FacebookUtils.fetchUser.calledWith(token)).to.be.true;
        done();
      });
  });

  context('if facebook user is fetched successfully', () => {
    it('should attach the user to the request body', (done) => {
      const user = { name: 'Ramanpreet Nara', id: '10' };
      const FacebookUtils = createFacebookUtils({ fetchUser: user });
      const { server } = createServer({ FacebookUtils });
      server
        .get('/')
        .end((error, response) => {
          expect(response.body).to.deep.equal(user);
          done(error);
        });
    });
  });

  context('if Authorization header is missing', () => {
    it('should default the access token to \'\' before fetching facebook user', (done) => {
      const { server, deps: { FacebookUtils } } = createServer();
      server
        .get('/')
        .end(() => {
          expect(FacebookUtils.fetchUser.calledWith('')).to.be.true;
          done();
        });
    });
  });

  context('if the faceook user cannot be fetched', () => {
    it('should log the error using winston#error', (done) => {
      const error = new Error('horse');
      const FacebookUtils = createFacebookUtils({ fetchUser: error });
      const { server, deps: { winston } } = createServer({ FacebookUtils });
      server.get('/').end(() => {
        expect(winston.error.calledWith(error));
        done();
      });
    });

    it('should respond with a 401 status', (done) => {
      const FacebookUtils = createFacebookUtils({ fetchUser: reject() });
      const { server } = createServer({ FacebookUtils });
      server.get('/').expect(401, done);
    });

    it('should respond with an informative error message', (done) => {
      const FacebookUtils = createFacebookUtils({ fetchUser: reject() });
      const { server } = createServer({ FacebookUtils });
      server
        .get('/')
        .end((error, response) => {
          [/failed/i, /auth/i, /facebook/i].forEach((regex) => {
            expect(response.body.data).to.match(regex);
          });
          done(error);
        });
    });
  });
});

function createServer({
  FacebookUtils = createFacebookUtils(),
  winston = createWinston(),
} = {}) {
  const { default: authenticate } = proxyquire('./facebook', {
    [DEPENDENCIES.FacebookUtils]: FacebookUtils,
    [DEPENDENCIES.winston]: winston,
  });
  const app = express();
  app.use(authenticate());
  app.all('*', (_, r) => r.json(_.user));
  return {
    server: supertest(app),
    deps: { FacebookUtils, winston },
  };
}

function resolve(...args) {
  return Promise.resolve(...args);
}

function reject(...args) {
  return Promise.reject(...args);
}

function createFacebookUtils({ fetchUser } = {}) {
  return {
    fetchUser: sinon.stub().returns(resolve(fetchUser)),
  };
}

function createWinston({ error } = {}) {
  return {
    error: sinon.stub().returns(error),
  };
}
