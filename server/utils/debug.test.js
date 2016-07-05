import * as td from 'testdouble';
import test from 'ava';

test('"trace" should return a function that invokes the function passed in', () => {
  const { trace } = requireTrace();
  const fn = td.function();
  trace(fn)();
  td.verify(fn());
});

test('"trace" return function should forward arguments to the function passed in', () => {
  const { trace } = requireTrace();
  const fn = td.function();
  const args = [1, 2, 3, 4];
  trace(fn)(...args);
  td.verify(fn(...args));
});

test('"trace" return function should log its actual arguments, when called', () => {
  const { trace, deps: { Logger } } = requireTrace();
  const fn = td.function();
  const args = [1, 2, 3, 4];
  trace(fn)(...args);
  td.verify(Logger.log(td.matchers.contains({ arguments: args })));
});

test('"trace" return function should log the return value of the function passed in', () => {
  const { trace, deps: { Logger } } = requireTrace();
  const ret = 1;
  const fn = () => ret;
  trace(fn)();
  td.verify(Logger.log(td.matchers.contains({ return: ret })));
});

test('"trace" return function should log the name of the function passed in', () => {
  const { trace, deps: { Logger } } = requireTrace();
  const fn = function horse() {};
  trace(fn)();
  td.verify(Logger.log(td.matchers.contains({ name: 'horse' })));
});

test('"trace" return function should return the return value of the traced function', (assert) => {
  const { trace } = requireTrace();
  const ret = 1;
  const fn = () => ret;
  assert.is(trace(fn)(), ret);
});

function requireTrace() {
  const Logger = td.replace('./log');
  return {
    trace: require('./debug').trace,
    deps: { Logger },
  };
}
