import { arrayToSeed, seedToArray } from './seeds'

test('make seed from array', () => {
  const seed = arrayToSeed(
    Uint16Array.from([0, 1, 15, 16, 255])
  );

  expect(seed).toBe('00010f10ff');
});

test('recover array from seed', () => {
  const array = seedToArray('00010f10ff');

  expect(array).toStrictEqual(Uint16Array.from([0, 1, 15, 16, 255]));
});

test('seed length', () => {
  const arrayLength = 100;

  expect(
    arrayToSeed(new Uint16Array(arrayLength)).length
  ).toBe(arrayLength * 2);
});