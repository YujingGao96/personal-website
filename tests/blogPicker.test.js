import assert from 'assert/strict';
import test from 'node:test';
import { blogsInHomePage } from '../src/resolvers/blogPicker.js';
import { readFileSync } from 'fs';
const allBlogs = JSON.parse(readFileSync(new URL('../src/data/blogs.json', import.meta.url)));

test('blogsInHomePage picks valid ids', () => {
  assert.ok(blogsInHomePage.length <= 4);
  blogsInHomePage.forEach(id => assert.ok(allBlogs.includes(id)));
});
