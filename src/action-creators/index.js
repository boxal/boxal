import { AUTH, ALBUMS } from '../constants';

export function userAuthenticated(user, token) {
  return {
    type: AUTH.LOGIN_USER_SUCCESS,
    payload: { user, token },
  };
}

export function addAlbumLink( albumLink ) {
  return { type: ALBUMS.ADD_ALBUM_LINK, payload: { Link: albumLink } };
}
