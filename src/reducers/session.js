import * as C from '../constants';
import * as I from 'immutable';
import * as ReduxActions from 'redux-actions';

const INITIAL_STATE = I.fromJS({
  token: null,
  user: {},
  hasError: false,
  isLoading: false,
});

export default ReduxActions.handleActions({

  [C.AUTH_ACTIONS.LOGIN_USER_PENDING]: (state) => {
    return state.merge(I.fromJS({
      token: null,
      user: {},
      hasError: false,
      isLoading: true,
    }));
  },

  [C.AUTH_ACTIONS.LOGIN_USER_SUCCESS]: (state, action) => {
    return state.merge(I.fromJS({
      token: action.payload.token,
      user: action.payload.user,
      hasError: false,
      isLoading: false,
    }));
  },

  [C.AUTH_ACTIONS.LOGIN_USER_ERROR]: (state) => {
    return state.merge(I.fromJS({
      hasError: true,
      isLoading: false,
    }));
  },

  [C.AUTH_ACTIONS.LOGOUT_USER]: (state) => {
    return state.merge(INITIAL_STATE);
  },

}, INITIAL_STATE);
