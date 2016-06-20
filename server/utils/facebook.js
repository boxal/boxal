import fetch from './fetch';

export function fetchUser(token) {
  return fetch(`https://graph.facebook.com/v2.5/me?access_token=${token}`);
}
