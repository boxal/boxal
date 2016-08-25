import createActions from '../utils/create-actions';

export const ACTIONS = createActions('Root', [
  'INITIALIZE',
]);

export const AUTH_ACTIONS = createActions('App', [
  'LOGIN_USER_PENDING',
  'LOGIN_USER_SUCCESS',
  'LOGIN_USER_ERROR',
  'LOGOUT_USER',
  'GET_USER_INFO',
]);

export const ALBUM_ACTIONS = createActions('AlbumActions', [
  'SAVE_ALBUM_TO_DB',
  'SAVE_ALBUM_TO_STORE',
  'FETCH_ALBUMS_FROM_DB',
  'SAVE_ALBUMS_TO_STORE',
]);

export const REDUX_SOCKET_IO_PREFIX = '@@socket-io';

export const SOCKET_ACTIONS = {
  SCRAPE_ALBUM_IMAGES: `${REDUX_SOCKET_IO_PREFIX}/SCRAPE_ALBUM_IMAGES`,
  ALBUM_IMAGE_SRCSET: 'ALBUM_IMAGE_SRCSET',
};

export const SOCKET_IO_URL = 'http://localhost:3000/';
