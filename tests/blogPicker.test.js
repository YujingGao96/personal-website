import assert from 'assert/strict';
import test from 'node:test';
import { blogsInHomePage } from '../src/resolvers/blogPicker.js';
import allBlogs from '../src/data/blogs.js';

test('blogsInHomePage picks valid ids', () => {
  assert.ok(blogsInHomePage.length <= 4);
  blogsInHomePage.forEach(id => assert.ok(allBlogs.includes(id)));
});
