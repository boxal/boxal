export default function fetchAccessToken() {
  const session = window.localStorage.getItem('boxal') || '{}';
  return JSON.parse(session).token;
}
