import * as I from 'immutable';
import * as C from '../constants';
import * as R from 'ramda';
import * as ReduxActions from 'redux-actions';

const INITIAL_STATE = I.Map({
  albumLinks: I.OrderedSet(),
});

export default ReduxActions.handleActions({

  [C.ALBUM_ACTIONS.SAVE_ALBUM_TO_STORE]: (state, { payload }) => {
    const { dropboxLink } = payload;
    return state.update('albumLinks', (albumLinks) => albumLinks.add(dropboxLink));
  },

  [C.ALBUM_ACTIONS.SAVE_ALBUMS_TO_STORE]: (state, { payload }) => {
    const { albums } = payload;
    const dropboxLinks = albums.map(R.prop('dropboxLink'));
    return state.update('albumLinks', (albumLinks) => albumLinks.concat(dropboxLinks));
  },

}, INITIAL_STATE);
