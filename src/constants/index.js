import createActions from '../utils/create-actions';

export const AUTH_ACTIONS = createActions('App', [
  'LOGIN_USER_PENDING',
  'LOGIN_USER_SUCCESS',
  'LOGIN_USER_ERROR',
  'LOGOUT_USER',
  'GET_USER_INFO',
]);

export const ALBUM_ACTIONS = createActions('AlbumActions', [
  'ADD_ALBUM_LINK',
]);
