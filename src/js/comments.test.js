/**
 * @jest-environment jsdom
 */

import { commentCounter } from './commentCounter';

test('items counter check ', () => {
  const arr = [
    {
      id: 1,
      username: '',
      comment: '',
    },
  ];
  const counter = commentCounter(arr);

  expect(counter).toBe(1);
});

test('items counter check if num of comments 0 ', () => {
  const arr = [];

  const counter = commentCounter(arr);

  expect(counter).toBe(0);
});

test('items counter check if data is invalid ', () => {
  const string = 'test';

  const counter = commentCounter(string);

  expect(counter).toBe('invalid');
});