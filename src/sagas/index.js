import * as C from '../constants';
import * as ReduxSaga from 'redux-saga';
import * as Effects from 'redux-saga/effects';
import * as API from '../utils/api';
import * as AlbumActionCreators from '../action-creators/album';
import fetchAccessToken from '../utils/fetch-access-token';

export default function* root() {
  yield [
    ReduxSaga.takeEvery(C.ACTIONS.INITIALIZE, initialize),
    ReduxSaga.takeEvery(C.ALBUM_ACTIONS.SAVE_ALBUM_TO_DB, saveAlbumToDB),
    ReduxSaga.takeEvery(C.ALBUM_ACTIONS.FETCH_ALBUMS_FROM_DB, fetchAlbumsFromDB),
  ];
}

export function* initialize() {
  const isLoggedIn = !! fetchAccessToken();
  if (isLoggedIn) {
    yield Effects.put(AlbumActionCreators.fetchAlbumsFromDB());
  }
}

export function* saveAlbumToDB({ payload }) {
  const { dropboxLink } = payload;
  const response = yield API.post('/api/users/me/albums', { dropboxLink });
  yield Effects.put(AlbumActionCreators.saveAlbumToStore(response.data));
}

export function* fetchAlbumsFromDB() {
  const response = yield API.get('/api/users/me/albums');
  yield Effects.put(AlbumActionCreators.saveAlbumsToStore(response.data));
}
