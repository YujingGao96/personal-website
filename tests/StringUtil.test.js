import assert from 'assert/strict';
import test from 'node:test';
import { extractBeforeLastDash } from '../src/util/StringUtil.js';

test('extractBeforeLastDash with dash', () => {
  const result = extractBeforeLastDash('a-b-c-d');
  assert.equal(result, 'a b c');
});

test('extractBeforeLastDash without dash', () => {
  const result = extractBeforeLastDash('abc');
  assert.equal(result, 'abc');
});
