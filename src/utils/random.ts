/**
 * Random Data Generation Utilities
 */

import { SeededRandom, randomInt, randomPick, randomFloat } from './seed';

/**
 * Characters for random string generation
 */
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const ALPHANUMERIC = LOWERCASE + UPPERCASE + DIGITS;

/**
 * Generate a random string of alphanumeric characters
 * @param random - The random function
 * @param length - Length of the string
 * @returns A random alphanumeric string
 */
export function randomAlphaNumeric(random: SeededRandom, length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomPick(random, ALPHANUMERIC.split('')) || '';
  }
  return result;
}

/**
 * Generate a random lowercase string
 * @param random - The random function
 * @param length - Length of the string
 * @returns A random lowercase string
 */
export function randomLowerCase(random: SeededRandom, length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomPick(random, LOWERCASE.split('')) || '';
  }
  return result;
}

/**
 * Generate a random uppercase string
 * @param random - The random function
 * @param length - Length of the string
 * @returns A random uppercase string
 */
export function randomUpperCase(random: SeededRandom, length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomPick(random, UPPERCASE.split('')) || '';
  }
  return result;
}

/**
 * Generate a random string matching a pattern
 * Uses pattern characters: a=lowercase, A=uppercase, #=digit, *=alphanumeric
 * @param random - The random function
 * @param pattern - Pattern string (e.g., "###-###-####")
 * @returns A random string matching the pattern
 */
export function randomPattern(random: SeededRandom, pattern: string): string {
  let result = '';
  
  for (const char of pattern) {
    switch (char) {
      case 'a':
        result += randomPick(random, LOWERCASE.split('')) || '';
        break;
      case 'A':
        result += randomPick(random, UPPERCASE.split('')) || '';
        break;
      case '#':
        result += randomPick(random, DIGITS.split('')) || '';
        break;
      case '*':
        result += randomPick(random, ALPHANUMERIC.split('')) || '';
        break;
      default:
        result += char;
    }
  }
  
  return result;
}

/**
 * Sample words for realistic text generation
 */
const SAMPLE_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing',
  'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore',
  'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam',
  'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure',
  'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat',
  'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum'
];

/**
 * Generate a random readable word
 * @param random - The random function
 * @returns A random word
 */
export function randomWord(random: SeededRandom): string {
  return randomPick(random, SAMPLE_WORDS) || 'lorem';
}

/**
 * Generate random readable text (sentence)
 * @param random - The random function
 * @param minWords - Minimum number of words
 * @param maxWords - Maximum number of words
 * @returns A random sentence
 */
export function randomSentence(random: SeededRandom, minWords = 5, maxWords = 15): string {
  const wordCount = randomInt(random, minWords, maxWords);
  const words: string[] = [];
  
  for (let i = 0; i < wordCount; i++) {
    words.push(randomWord(random));
  }
  
  // Capitalize first letter
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  
  // Add punctuation
  return words.join(' ') + '.';
}

/**
 * Generate random paragraphs
 * @param random - The random function
 * @param minSentences - Minimum number of sentences
 * @param maxSentences - Maximum number of sentences
 * @returns A random paragraph
 */
export function randomParagraph(random: SeededRandom, minSentences = 3, maxSentences = 8): string {
  const sentenceCount = randomInt(random, minSentences, maxSentences);
  const sentences: string[] = [];
  
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(randomSentence(random));
  }
  
  return sentences.join(' ');
}

/**
 * Generate a random boolean
 * @param random - The random function
 * @returns A random boolean
 */
export function randomBoolean(random: SeededRandom): boolean {
  return random() > 0.5;
}

/**
 * Generate a random date within a range
 * @param random - The random function
 * @param minDate - Minimum date (timestamp)
 * @param maxDate - Maximum date (timestamp)
 * @returns A random date timestamp
 */
export function randomDate(random: SeededRandom, minDate: number, maxDate: number): number {
  return randomInt(random, minDate, maxDate);
}

/**
 * Get current timestamp for date generation
 */
const CURRENT_TIMESTAMP = Date.now();
const ONE_DAY = 24 * 60 * 60 * 1000;

/**
 * Generate a random recent date
 * @param random - The random function
 * @param daysAgo - Number of days to go back
 * @returns A random date within the specified range
 */
export function randomRecentDate(random: SeededRandom, daysAgo = 365): number {
  const minDate = CURRENT_TIMESTAMP - (daysAgo * ONE_DAY);
  return randomDate(random, minDate, CURRENT_TIMESTAMP);
}

/**
 * Generate a random number within bounds, respecting multipleOf
 * @param random - The random function
 * @param min - Minimum value
 * @param max - Maximum value
 * @param multipleOf - MultipleOf constraint
 * @returns A random number
 */
export function randomNumber(
  random: SeededRandom,
  min: number,
  max: number,
  multipleOf?: number
): number {
  if (multipleOf !== undefined && multipleOf > 0) {
    // Adjust min to be a multiple of multipleOf
    const adjustedMin = Math.ceil(min / multipleOf) * multipleOf;
    const adjustedMax = Math.floor(max / multipleOf) * multipleOf;
    
    if (adjustedMin > adjustedMax) {
      return min; // Fallback if constraints are impossible
    }
    
    const steps = Math.floor((adjustedMax - adjustedMin) / multipleOf);
    const randomStep = randomInt(random, 0, steps);
    return adjustedMin + (randomStep * multipleOf);
  }
  
  return randomFloat(random, min, max);
}
