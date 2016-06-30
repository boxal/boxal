import * as I from 'immutable';

export function getAlbumLinks( state ) {
  return state.album.get('albumLinks', I.List());
}
