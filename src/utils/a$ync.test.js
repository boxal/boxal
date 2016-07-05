import test from 'ava';
import * as td from 'testdouble';
import a$ync from './a$ync';

test('should return a function that forwards arguments to "fn"', async () => {
  const fn = td.function();
  const args = [1, 2, 3, 4];
  const a$yncFn = a$ync(fn);
  await a$yncFn(...args);
  td.verify(fn(...args));
});

test('should execute "fn" asynchronously', async (assert) => {
  const fn = td.function();
  const args = [1, 2, 3, 4];
  const a$yncFn = a$ync(fn);
  const promise = a$yncFn(...args);
  assert.throws(() => td.verify(fn(...args)));
  await promise;
  td.verify(fn(...args));
});

test('should return a function returning a promise resolving to "fn(...args)"', async (assert) => {
  const fn = td.function();
  const args = [1, 2, 3, 4];
  const ret = 1;
  const a$yncFn = a$ync(fn);
  td.when(fn(...args)).thenReturn(ret);

  assert.is(await a$yncFn(...args), ret);
});
