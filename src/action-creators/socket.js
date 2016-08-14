import * as C from '../constants';
import * as ReduxActions from 'redux-actions';

export const scrapeAlbumImages = ReduxActions.createAction(
  C.SOCKET_ACTIONS.SCRAPE_ALBUM_IMAGES,
  (url) => ({ url }),
);
