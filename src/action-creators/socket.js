import * as C from '../constants';
import * as ReduxActions from 'redux-actions';

export const scrapeAlbumImages = ReduxActions.createAction(
  C.SOCKET_ACTIONS.SCRAPE_ALBUM_IMAGES,
  (url) => ({ url }),
);

export const setAlbumImageSrcset = ReduxActions.createAction(
  C.SOCKET_ACTIONS.ALBUM_IMAGE_SRCSET,
  ({ srcset }, { dropboxLink }) => ({ srcset, dropboxLink }),
);
