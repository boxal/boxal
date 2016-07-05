export default function a$ync(fn) {
  return (...args) => {
    return Promise.resolve().then(() => fn(...args));
  };
}
