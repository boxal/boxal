import * as C from '../constants';
import * as ReduxActions from 'redux-actions';

export const loginUser = ReduxActions.createAction(
  C.AUTH_ACTIONS.LOGIN_USER_SUCCESS,
  (user, token) => ({ user, token }),
);
