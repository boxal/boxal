import * as Logger from './log';

export function trace(fn) {
  return (...args) => {
    const x = fn(...args);
    Logger.log({
      name: fn.name,
      arguments: args,
      return: x,
    });
    return x;
  };
}
