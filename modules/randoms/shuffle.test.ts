import { shuffle } from './shuffle';

const data = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
];

test.each([
  ['010203040506', data],
  ['010203020100', [...data].reverse()],
])('shuffle array with seed: %s', (seed, result) => {

  expect(shuffle(data, seed)).toStrictEqual(result);

});

test('apply not hex', () => {
  expect(shuffle(data, 'qwerty')).not.toBeNull();
})
