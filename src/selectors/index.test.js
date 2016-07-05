import test from 'ava';
import * as I from 'immutable';
import * as Selectors from './index';

test('"getAlbumLinks" should return the state\'s albumLink', (assert) => {
  const albumLinks = I.List.of('1', '2', '3');
  const state = {
    album: I.Map({ albumLinks }),
  };
  assert.is(Selectors.getAlbumLinks(state), albumLinks);
});

test('"getAlbumLinks" should return I.List(), if "albumLinks" is not in state', (assert) => {
  const state = {
    album: I.Map(),
  };
  assert.truthy(I.is(Selectors.getAlbumLinks(state), I.List()));
});
