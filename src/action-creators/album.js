import * as C from '../constants';
import * as ReduxActions from 'redux-actions';

export const saveAlbumToStore = ReduxActions.createAction(
  C.ALBUM_ACTIONS.SAVE_ALBUM_TO_STORE,
  ({ dropboxLink }) => ({ dropboxLink }),
);

export const saveAlbumToDB = ReduxActions.createAction(
  C.ALBUM_ACTIONS.SAVE_ALBUM_TO_DB,
  ({ dropboxLink }) => ({ dropboxLink }),
);

export const fetchAlbumsFromDB = ReduxActions.createAction(
  C.ALBUM_ACTIONS.FETCH_ALBUMS_FROM_DB,
);

export const saveAlbumsToStore = ReduxActions.createAction(
  C.ALBUM_ACTIONS.SAVE_ALBUMS_TO_STORE,
  (albums) => ({ albums }),
);
