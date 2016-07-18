import fetchAccessToken from '../fetch-access-token';
import deepmerge from 'deepmerge';

export default function decorateWithAccessToken(options) {
  const token = fetchAccessToken();
  return deepmerge(options, {
    headers: {
      'Authorization': `bearer ${token}`,
    },
  });
}
