import proxyquire from 'proxyquire';
import test from 'ava';
import * as td from 'testdouble';

test('"Logger.log" should forward all arguments to "winston.log"', () => {
  const { Logger, deps: { winston } } = requireLogger();
  const args = [1, 2, 3, 4, 5, 6];
  Logger.log(...args);
  td.verify(winston.log(...args));
});

test('"Logger.error" should forward all arguments to "winston.error"', () => {
  const { Logger, deps: { winston } } = requireLogger();
  const args = [1, 2, 3, 4, 5, 6];
  Logger.error(...args);
  td.verify(winston.error(...args));
});

function requireLogger() {
  const winston = {
    log: td.function(),
    error: td.function(),
  };
  const Logger = proxyquire('./log', { winston });
  return {
    Logger, deps: { winston },
  };
}
