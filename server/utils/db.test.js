import test from 'ava';
import * as td from 'testdouble';
import { sanitize, toObject } from './db';

test('"sanitize" should remove "_id" property from objects', (assert) => {
  const doc = {
    one: 1,
    two: 2,
    three: 3,
  };
  const _id = 10;
  assert.deepEqual(sanitize({ ...doc, _id }), doc);
});

test('"sanitize" should remove "__v" property from objects', (assert) => {
  const doc = {
    one: 1,
    two: 2,
    three: 3,
  };
  const __v = 10;
  assert.deepEqual(sanitize({ ...doc, __v }), doc);
});

test('"toObject" should invoke the document\'s .toObject method', () => {
  const doc = {
    toObject: td.function(),
  };
  toObject(doc);
  td.verify(doc.toObject());
});
