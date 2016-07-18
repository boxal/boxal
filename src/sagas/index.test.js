import test from 'ava';
import * as td from 'testdouble';
import * as Effects from 'redux-saga/effects';
import * as AlbumActionCreators from '../action-creators/album';

test('"root" should yield an array', (assert) => {
  const { default: root } = requireSagas();
  const iterator = root();
  const { value } = iterator.next();
  assert.truthy(Array.isArray(value));
  iterator.next();
});

test('"saveAlbumToDB" should save the dropboxLink to the database', () => {
  const { saveAlbumToDB, deps: { API } } = requireSagas();
  const dropboxLink = 'my link';
  const action = AlbumActionCreators.saveAlbumToDB({ dropboxLink });
  const iterator = saveAlbumToDB(action);
  iterator.next();
  iterator.next({ data: {} });
  iterator.next();

  td.verify(API.post('/api/users/me/albums', { dropboxLink }));
});

test('"saveAlbumToDB" should dispatch an action to save the link to the store', (assert) => {
  const { saveAlbumToDB } = requireSagas();
  const dropboxLink = 'my link';
  const action = AlbumActionCreators.saveAlbumToDB({ dropboxLink });
  const iterator = saveAlbumToDB(action);
  const response = { data: { dropboxLink } };
  iterator.next();
  const { value: effect } = iterator.next(response);
  iterator.next();

  assert.deepEqual(Effects.put(AlbumActionCreators.saveAlbumToStore({ dropboxLink })), effect);
});

test('"fetchAlbumsFromDB" should fetch all albums from the database', () => {
  const { fetchAlbumsFromDB, deps: { API } } = requireSagas();
  const iterator = fetchAlbumsFromDB();
  iterator.next();
  td.verify(API.get('/api/users/me/albums'));
  iterator.next({ data: [] });
  iterator.next();
});

test('"fetchAlbumsFromDB" should dispatch an action to save all albums to the store', (assert) => {
  const { fetchAlbumsFromDB } = requireSagas();
  const iterator = fetchAlbumsFromDB();
  const albums = [{ dropboxLink: '123456' }];
  const response = { data: albums };
  iterator.next();
  const { value: effect } = iterator.next(response);
  assert.deepEqual(Effects.put(AlbumActionCreators.saveAlbumsToStore(albums)), effect);
  iterator.next();
});

test('"initialize" should fetch all albums from db, if user is logged in', (assert) => {
  const { initialize, deps: { fetchAccessToken } } = requireSagas();
  const iterator = initialize();
  td.when(fetchAccessToken()).thenReturn('123');
  const { value: effect } = iterator.next();
  assert.deepEqual(effect, Effects.put(AlbumActionCreators.fetchAlbumsFromDB()));
  iterator.next();
});

test('"initialize" should do nothing, if user is not logged in', (assert) => {
  const { initialize, deps: { fetchAccessToken } } = requireSagas();
  const iterator = initialize();
  td.when(fetchAccessToken()).thenReturn(undefined);
  const { done } = iterator.next();
  assert.truthy(done);
});

function requireSagas() {
  const API = td.replace('../utils/api');
  const fetchAccessToken = td.replace('../utils/fetch-access-token', td.function());
  const sagas = require('./index');
  return {
    ...sagas,
    deps: {
      API,
      fetchAccessToken,
    },
  };
}
