import { cleanSeed, randomSeed, seedToArray } from './seeds';

const swap = <T extends Array<any>>(data: T, index: number, opponent: number): T => {

  if (index === opponent) {
    return data;
  }

  const [first, later] = [index, opponent].sort((a, b) => a - b);

  return [
    ...data.slice(0, first),
    data[later],
    ...data.slice(first + 1, later),
    data[first],
    ...data.slice(later + 1),
  ] as T;
}

const calcOpponentIndex = (seed: number, salt: number, length: number) => {
  return (seed + salt) % length;
};

export const shuffle = <T extends Array<any>>(data: T, seed: string = randomSeed(data.length), salt: number = 0): T => {

  const length = data.length;
  const cleanedSeed = seedToArray(cleanSeed(seed, length));

  return cleanedSeed.reduceRight((state, seed, index) => {
    return swap(state, index + 1, calcOpponentIndex(seed, salt, index + 2));
  }, data);

}