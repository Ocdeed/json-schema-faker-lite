/**
 * Date Format Generator
 * ISO 8601 formatted dates
 */

import { SeededRandom, randomInt } from '../utils/seed';

/**
 * Generate a random date-time in ISO 8601 format
 * @param random - The random function
 * @returns An ISO 8601 date-time string
 */
export function generateDateTime(random: SeededRandom): string {
  // Generate random date within the last 5 years
  const now = Date.now();
  const fiveYearsAgo = now - (5 * 365 * 24 * 60 * 60 * 1000);
  const timestamp = randomInt(random, fiveYearsAgo, now);
  
  const date = new Date(timestamp);
  
  // Format as ISO 8601
  return date.toISOString();
}

/**
 * Generate a random date in ISO 8601 format (YYYY-MM-DD)
 * @param random - The random function
 * @returns An ISO 8601 date string
 */
export function generateDate(random: SeededRandom): string {
  // Generate random date within the last 5 years
  const now = Date.now();
  const fiveYearsAgo = now - (5 * 365 * 24 * 60 * 60 * 1000);
  const timestamp = randomInt(random, fiveYearsAgo, now);
  
  const date = new Date(timestamp);
  
  // Format as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Generate a random time in ISO 8601 format (HH:mm:ss)
 * @param random - The random function
 * @returns An ISO 8601 time string
 */
export function generateTime(random: SeededRandom): string {
  const hours = randomInt(random, 0, 23);
  const minutes = randomInt(random, 0, 59);
  const seconds = randomInt(random, 0, 59);
  
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');
  
  return `${h}:${m}:${s}`;
}

/**
 * Generate a random timestamp (Unix epoch in milliseconds)
 * @param random - The random function
 * @returns A Unix timestamp
 */
export function generateTimestamp(random: SeededRandom): number {
  // Generate random date within the last 10 years
  const now = Date.now();
  const tenYearsAgo = now - (10 * 365 * 24 * 60 * 60 * 1000);
  return randomInt(random, tenYearsAgo, now);
}
