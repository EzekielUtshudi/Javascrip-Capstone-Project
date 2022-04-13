import { itemsCounter } from './itemsCounter';

test('items counter check ', () => {
  const arr = [
    {
      id: 3,
    },
  ];
  const counter = itemsCounter(arr);

  expect(counter).toBe(1);
});

test('items counter check if the there no data ', () => {
  const arr = [];

  const counter = itemsCounter(arr);

  expect(counter).toBe(0);
});

test('items counter check if not an invalid data ', () => {
  const string = 'test';

  const counter = itemsCounter(string);

  expect(counter).toBe('invalid');
});