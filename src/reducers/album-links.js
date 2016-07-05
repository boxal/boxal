import * as I from 'immutable';
import * as C from '../constants';
import * as ReduxActions from 'redux-actions';

const INITIAL_STATE = I.Map({
  albumLinks: I.List(),
});

export default ReduxActions.handleActions({

  [C.ALBUM_ACTIONS.ADD_ALBUM_LINK]: (state, action) => {
    const link = action.payload.Link;
    return state.update('albumLinks', (albumLinks) => albumLinks.push(link));
  },

}, INITIAL_STATE);
