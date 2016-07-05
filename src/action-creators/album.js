import * as C from '../constants';
import * as ReduxActions from 'redux-actions';

export const addAlbumLink = ReduxActions.createAction(
  C.ALBUM_ACTIONS.ADD_ALBUM_LINK,
  (link) => ({ Link: link }),
);
