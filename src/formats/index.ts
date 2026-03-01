/**
 * Format Handlers Index
 * Registry system for format generators
 */

import { SeededRandom } from '../utils/seed';

import { generateEmail } from './email';
import { generateUUID } from './uuid';
import { generateDateTime, generateDate, generateTime, generateTimestamp } from './date';
import { generateURL, generateHostname } from './url';

/**
 * Format generator function type
 */
export type FormatGenerator = (random: SeededRandom) => string;

/**
 * Registry of format generators
 */
const formatGenerators: Record<string, FormatGenerator> = {
  email: generateEmail,
  uuid: generateUUID,
  'date-time': generateDateTime,
  date: generateDate,
  time: generateTime,
  uri: generateURL,
  url: generateURL,
  hostname: generateHostname,
};

/**
 * Check if a format is supported
 * @param format - The format name
 * @returns True if format is supported
 */
export function isSupportedFormat(format: string): boolean {
  return format in formatGenerators;
}

/**
 * Generate a value for a given format
 * @param format - The format name
 * @param random - The random function
 * @returns Generated string value
 * @throws Error if format is not supported
 */
export function generateFormat(format: string, random: SeededRandom): string {
  const generator = formatGenerators[format];
  
  if (!generator) {
    // Return a placeholder for unsupported formats
    return `format:${format}`;
  }
  
  return generator(random);
}

/**
 * Register a custom format generator
 * @param format - The format name
 * @param generator - The generator function
 */
export function registerFormat(format: string, generator: FormatGenerator): void {
  formatGenerators[format] = generator;
}

/**
 * Get all supported format names
 * @returns Array of supported format names
 */
export function getSupportedFormats(): string[] {
  return Object.keys(formatGenerators);
}

// Export individual generators
export {
  generateEmail,
  generateUUID,
  generateDateTime,
  generateDate,
  generateTime,
  generateTimestamp,
  generateURL,
  generateHostname
};
