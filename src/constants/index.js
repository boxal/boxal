export const AUTH = createActions('App', [
  'LOGIN_USER_PENDING',
  'LOGIN_USER_SUCCESS',
  'LOGIN_USER_ERROR',
  'LOGOUT_USER',
  'GET_USER_INFO',
]);

export const ALBUMS = createActions('ALBUMS', [
  'ADD_ALBUM_LINK',
]);

function createActions(ns, actions) {
  return Object.freeze(actions.reduce((map, action) => {
    map[action] = `@@${ns}/${action}`;
    return map;
  }, {}));
}
