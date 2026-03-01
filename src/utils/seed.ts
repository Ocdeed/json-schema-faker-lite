/**
 * Seeded Random Number Generator
 * Uses mulberry32 PRNG algorithm for deterministic generation
 */

/**
 * Seeded random number generator function
 */
export type SeededRandom = () => number;

/**
 * Creates a seeded random number generator using mulberry32 algorithm
 * @param seed - The seed value (number)
 * @returns A function that returns random numbers between 0 and 1
 */
export function createSeededRandom(seed: number): SeededRandom {
  let state = seed;
  
  return function(): number {
    // Mulberry32 algorithm
    let t = state += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Hash a string to a number for use as seed
 * Uses a simple djb2-like hash function
 * @param str - The string to hash
 * @returns A number hash
 */
export function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash | 0; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Create a seeded random from either a number or string seed
 * @param seed - The seed value (number or string)
 * @returns A seeded random function
 */
export function createRandom(seed: number | string | undefined): SeededRandom {
  if (seed === undefined) {
    // Use Math.random if no seed provided
    return Math.random;
  }
  
  const seedNumber = typeof seed === 'string' ? hashString(seed) : seed;
  return createSeededRandom(seedNumber);
}

/**
 * Generate a random integer between min (inclusive) and max (inclusive)
 * @param random - The random function
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns A random integer
 */
export function randomInt(random: SeededRandom, min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min;
}

/**
 * Generate a random float between min (inclusive) and max (exclusive)
 * @param random - The random function
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns A random float
 */
export function randomFloat(random: SeededRandom, min: number, max: number): number {
  return random() * (max - min) + min;
}

/**
 * Pick a random element from an array
 * @param random - The random function
 * @param array - The array to pick from
 * @returns A random element or undefined if array is empty
 */
export function randomPick<T>(random: SeededRandom, array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  return array[randomInt(random, 0, array.length - 1)];
}

/**
 * Shuffle an array randomly
 * @param random - The random function
 * @param array - The array to shuffle
 * @returns A new shuffled array
 */
export function randomShuffle<T>(random: SeededRandom, array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(random, 0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
