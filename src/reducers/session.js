import * as C from '../constants';
import * as I from 'immutable';

const INITIAL_STATE = I.fromJS({
  token: null,
  user: {},
  hasError: false,
  isLoading: false,
});

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case C.AUTH_ACTIONS.LOGIN_USER_PENDING:
      return state.merge(I.fromJS({
        token: null,
        user: {},
        hasError: false,
        isLoading: true,
      }));

    case C.AUTH_ACTIONS.LOGIN_USER_SUCCESS:
      return state.merge(I.fromJS({
        token: action.payload.token,
        user: action.payload.user,
        hasError: false,
        isLoading: false,
      }));

    case C.AUTH_ACTIONS.LOGIN_USER_ERROR:
      return state.merge(I.fromJS({
        hasError: true,
        isLoading: false,
      }));

    case C.AUTH_ACTIONS.LOGOUT_USER:
      return state.merge(INITIAL_STATE);

    default:
      return state;
  }
}

export default sessionReducer;
