import test from 'ava';
import td from 'testdouble';
import monk from 'monk';
import supertest from 'supertest';
import express from 'express';

const TOKEN = [
  'UmFtYW5wcmVldCBOYXJh',
  'TWFuZGlzaCBTaGFo',
  'QnJhbmRvbiBCb3dlbg',
];

const FACEBOOK_USERS = {
  [TOKEN[0]]: { id: '123456', name: 'Ramanpreet Nara' },
  [TOKEN[1]]: { id: '654321', name: 'Mandish Shah' },
  [TOKEN[2]]: { id: '987654', name: 'Brandon Bowen' },
};


const DB = {
  albums: [
    { facebookUserId: FACEBOOK_USERS[TOKEN[0]].id, dropboxLink: 'one' },
    { facebookUserId: FACEBOOK_USERS[TOKEN[0]].id, dropboxLink: 'two' },
    { facebookUserId: FACEBOOK_USERS[TOKEN[2]].id, dropboxLink: 'three' },
  ],
};

function getAlbumsOfUserWithToken(token) {
  return DB.albums.filter((album) => {
    return album.facebookUserId === FACEBOOK_USERS[token].id;
  });
}

test.serial('should send an empty list, if the user has no albums', async (assert) => {
  const { response } = await request({
    token: TOKEN[0],
    method: 'get',
    url: '/users/me/albums',
  });

  assert.deepEqual(response.body, {
    data: getAlbumsOfUserWithToken(TOKEN[0]),
  });
});

test.serial('should send a list with one album, if user has one album', async (assert) => {
  const { response } = await request({
    token: TOKEN[2],
    method: 'get',
    url: '/users/me/albums',
  });

  assert.deepEqual(response.body, {
    data: getAlbumsOfUserWithToken(TOKEN[2]),
  });
});

test.serial('should send a list with two albums, if user has two albums', async (assert) => {
  const { response } = await request({
    token: TOKEN[0],
    method: 'get',
    url: '/users/me/albums',
  });

  assert.deepEqual(response.body, {
    data: getAlbumsOfUserWithToken(TOKEN[0]),
  });
});

test.serial('should save a new dropboxLink to the database', async (assert) => {
  const body = { dropboxLink: 'test' };
  const { deps: { db } } = await request({
    method: 'post',
    url: '/users/me/albums',
    token: TOKEN[1],
    body,
  });

  const document = await db.get('albums').findOne({ facebookUserId: FACEBOOK_USERS[TOKEN[1]].id });
  assert.is(body.dropboxLink, document.dropboxLink);
});

test.serial('should not create redundant dropbox links in the database', async (assert) => {
  const token = TOKEN[2];
  const albumLink = { dropboxLink: 'three', extra: 1 };
  const { deps: { db } } = await request({
    method: 'post',
    url: '/users/me/albums',
    body: albumLink,
    token,
  });

  const docs = await db.get('albums').find({ facebookUserId: FACEBOOK_USERS[token].id });
  assert.is(docs.length, 1);
});

test.serial('should return the newly saved dropboxLink in POST body', async (assert) => {
  const body = { dropboxLink: 'test' };
  const { response } = await request({
    method: 'post',
    url: '/users/me/albums',
    token: TOKEN[1],
    body,
  });

  assert.is(response.body.data.dropboxLink, body.dropboxLink);
});

test.serial('should attach the facebookUserId to the dropboxLink document', async (assert) => {
  const body = { dropboxLink: 'test' };
  const token = TOKEN[1];
  const { response } = await request({
    method: 'post',
    url: '/users/me/albums',
    token,
    body,
  });

  assert.is(response.body.data.facebookUserId, FACEBOOK_USERS[token].id);
});

test.serial('should not save invalid dropboxLink documents into the database', async (assert) => {
  const token = TOKEN[1];
  const body = { dropboxLin: 'test' };
  const facebookUserId = FACEBOOK_USERS[token].id;
  const { deps: { db } } = await request({
    method: 'post',
    url: '/users/me/albums',
    token,
    body,
  });

  const docs = await db.get('albums').find({ facebookUserId });
  assert.is(docs.length, 0);
});

test.serial('should return a 400 error, if request payload is invalid', async (assert) => {
  const token = TOKEN[1];
  const body = { dropboxLin: 'test' };
  const { response } = await request({
    method: 'post',
    url: '/users/me/albums',
    token,
    body,
  });

  assert.is(response.status, 400);
});

async function request({ url, token, body, method } = {}) {
  const app = await setupTests();
  const response = await app.request()
    [method](url)
    .send(body)
    .set('Authorization', `bearer ${token}`)
    .set('Content-Type', 'application/json');
  return {
    response,
    deps: app.deps,
  };
}

async function setupTests() {
  const db = await createDB();
  const FacebookUtils = createFacebookUtils();

  const app = express();
  const resources = require('../../../app').default;
  app.use('/', resources);
  return {
    request: () => supertest(app),
    deps: { db, FacebookUtils },
  };
}

async function createDB() {
  const db = td.replace('../../../services/db', monk('localhost/test-db-album-controller-js'));
  const Albums = db.get('albums');
  await Albums.remove({});
  await Promise.all(DB.albums.map((album) => {
    return Albums.insert({ ...album });
  }));
  return db;
}

function createFacebookUtils() {
  const FacebookUtils = td.replace('../../../utils/facebook');
  const error = reject(new Error('Not found'));
  td.when(FacebookUtils.fetchUser(td.matchers.anything())).thenReturn(error);
  Object.keys(FACEBOOK_USERS).forEach((name) => {
    td.when(FacebookUtils.fetchUser(name)).thenReturn(resolve(FACEBOOK_USERS[name]));
  });
  return FacebookUtils;
}

function reject(x) {
  const rejected = Promise.reject(x);
  /**
   * @description
   * Necessary. Otherwise bluebird will sometimes report 'Unhandled Rejection'.
   */
  rejected.catch(() => {});
  return rejected;
}

function resolve(x) {
  return Promise.resolve(x);
}
