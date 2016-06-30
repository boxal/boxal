import * as I from 'immutable';
import { ALBUMS } from '../constants';

const INITIAL_STATE = I.Map({
  albumLinks: I.List(),
});

const albumlinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALBUMS.ADD_ALBUM_LINK:
      const link = action.payload.Link;
      return state.update('albumLinks', (albumLinks) => albumLinks.push(link));
    default:
      return state;
  }
};
export default albumlinks;
