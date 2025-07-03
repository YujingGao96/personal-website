import assert from 'assert/strict';
import test from 'node:test';
import { shuffleArray } from '../src/util/ArrayUtil.js';

test('shuffleArray retains elements', () => {
  const arr = [1, 2, 3, 4];
  const result = shuffleArray([...arr]);
  assert.equal(result.length, arr.length);
  arr.forEach(v => assert.ok(result.includes(v)));
});
