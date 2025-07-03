import assert from 'assert/strict';
import test from 'node:test';
import { generateRandomGradient } from '../src/util/ColorUtil.js';

test('generateRandomGradient returns linear-gradient string', () => {
  const val = generateRandomGradient();
  assert.ok(val.startsWith('linear-gradient'));
});
