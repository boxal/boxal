import * as I from 'immutable';
import * as C from '../constants';
import * as R from 'ramda';
import * as ReduxActions from 'redux-actions';

const INITIAL_STATE = I.Map({
  albumLinks: I.OrderedSet(),
  imageSrcset: I.Map(),
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

  [C.SOCKET_ACTIONS.ALBUM_IMAGE_SRCSET]: (state, { payload } ) => {
    const { srcset, dropboxLink } = payload;
    return state.updateIn(['imageSrcset', dropboxLink], (srcsets = I.List()) => {
      return srcsets.push(srcset);
    });
  },

}, INITIAL_STATE);
