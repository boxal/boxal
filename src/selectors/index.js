import * as I from 'immutable';

export function getAlbumLinks( state ) {
  return state.album.get('albumLinks', I.List());
}

export function getImageSrcset( state ) {
  return state.album.get('imageSrcset', I.Map());
}
