/**
 * UUID Format Generator
 * RFC 4122 compliant UUID v4
 */

import { SeededRandom } from '../utils/seed';

/**
 * Generate a random hex byte (2 hex digits)
 * @param random - The random function
 * @returns A random hex byte
 */
function randomHexByte(random: SeededRandom): string {
  return Math.floor(random() * 256).toString(16).padStart(2, '0');
}

/**
 * Generate a RFC 4122 compliant UUID v4
 * @param random - The random function
 * @returns A UUID v4 string
 */
export function generateUUID(random: SeededRandom): string {
  // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  // where x is any hex digit and y is 8, 9, A, or B
  
  // Generate random hex strings
  const bytes: string[] = [];
  for (let i = 0; i < 16; i++) {
    bytes.push(randomHexByte(random));
  }
  
  // Set version to 4 (0100)
  bytes[6] = (parseInt(bytes[6][0], 16) | 0x4).toString(16) + bytes[6][1];
  
  // Set variant to 10xx (RFC 4122)
  const variantBits = parseInt(bytes[8][0], 16);
  const newVariant = (variantBits | 0x8).toString(16);
  bytes[8] = newVariant + bytes[8][1];
  
  // Format: 8-4-4-4-12
  return `${bytes[0]}${bytes[1]}${bytes[2]}${bytes[3]}-${bytes[4]}${bytes[5]}-${bytes[6]}${bytes[7]}-${bytes[8]}${bytes[9]}-${bytes[10]}${bytes[11]}${bytes[12]}${bytes[13]}${bytes[14]}${bytes[15]}`;
}

/**
 * Generate a simple UUID (not RFC compliant, for simpler use cases)
 * @param random - The random function
 * @returns A simple UUID-like string
 */
export function generateSimpleUUID(random: SeededRandom): string {
  const hex = '0123456789abcdef';
  
  let uuid = '';
  for (let i = 0; i < 32; i++) {
    uuid += hex[Math.floor(random() * hex.length)];
    if (i === 7 || i === 11 || i === 15 || i === 19) {
      uuid += '-';
    }
  }
  
  return uuid;
}
