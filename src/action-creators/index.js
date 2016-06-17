import { AUTH } from '../constants';

export function userAuthenticated(user, token) {
  return {
    type: AUTH.LOGIN_USER_SUCCESS,
    payload: { user, token },
  };
}
