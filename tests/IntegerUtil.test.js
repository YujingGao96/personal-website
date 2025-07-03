import assert from 'assert/strict';
import test from 'node:test';
import { getRandomNumber } from '../src/util/IntegerUtil.js';

test('getRandomNumber within range', () => {
  for (let i = 0; i < 10; i++) {
    const val = getRandomNumber();
    assert.ok(val >= 0 && val < 4);
  }
});
