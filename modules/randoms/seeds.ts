export const arrayToSeed = (array: Uint16Array): string => {
  return Buffer.from(array).toString('hex');
}

export const seedToArray = (seed: string): Uint16Array => {
  return Uint16Array.from(Buffer.from(seed, 'hex'));
}

export const randomSeed = (length: number): string => {
  const randoms = Array.from(new Array(length - 1), (_, k) => Math.floor(Math.random() * (k + 2)))

  return arrayToSeed(Uint16Array.from(randoms));
}

export const cleanSeed = (seed: string, length: number) => {
  const hexLength = (length - 1) * 2;
  return seed.padStart(hexLength, '0').slice(hexLength * -1);
}
