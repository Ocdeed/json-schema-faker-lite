/**
 * String Generator
 */

import { SeededRandom, randomInt, randomPick } from '../utils/seed';
import { randomWord, randomSentence } from '../utils/random';
import { generateFormat } from '../formats';
import { JSONSchemaString } from '../types/schema';

/**
 * Generate a random string from a schema
 * @param schema - String schema
 * @param random - Random function
 * @returns Generated string value
 */
export function generateString(schema: JSONSchemaString, random: SeededRandom): string {
  // Handle const
  if (schema.const !== undefined) {
    return String(schema.const);
  }
  
  // Handle enum
  if (schema.enum && schema.enum.length > 0) {
    const value = randomPick(random, schema.enum as string[]);
    return value !== undefined ? String(value) : '';
  }
  
  // Handle format
  if (schema.format) {
    return generateFormat(schema.format, random);
  }
  
  // Handle pattern
  if (schema.pattern) {
    return generateFromPattern(schema.pattern, random);
  }
  
  // Generate random string with constraints
  const minLength = schema.minLength ?? 5;
  const maxLength = schema.maxLength ?? 20;
  
  // Ensure min <= max
  const effectiveMin = Math.min(minLength, maxLength);
  const effectiveMax = Math.max(minLength, maxLength);
  
  // Generate based on length
  if (effectiveMax <= 10) {
    // Short strings - use alphanumeric
    return generateRandomString(random, effectiveMin, effectiveMax);
  } else {
    // Longer strings - use readable text
    return generateReadableString(random, effectiveMin, effectiveMax);
  }
}

/**
 * Generate a random alphanumeric string
 */
function generateRandomString(random: SeededRandom, min: number, max: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = randomInt(random, min, max);
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars[randomInt(random, 0, chars.length - 1)];
  }
  
  return result;
}

/**
 * Generate a readable string (words/sentences)
 */
function generateReadableString(random: SeededRandom, min: number, max: number): string {
  const length = randomInt(random, min, max);
  
  if (length <= 15) {
    // Short - use single word or two
    return randomWord(random);
  } else if (length <= 50) {
    // Medium - use sentence
    return randomSentence(random, 3, 8).slice(0, length);
  } else {
    // Long - use paragraph
    return randomSentence(random, 5, 15).slice(0, length);
  }
}

/**
 * Generate a string matching a regex pattern
 * Supports common pattern characters
 */
function generateFromPattern(pattern: string, random: SeededRandom): string {
  let result = '';
  
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    
    if (char === '\\' && i + 1 < pattern.length) {
      // Escape sequence
      const next = pattern[i + 1];
      switch (next) {
        case 'd':
          result += String(randomInt(random, 0, 9));
          break;
        case 'w':
          const wordChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
          result += wordChars[randomInt(random, 0, wordChars.length - 1)];
          break;
        case 's':
          result += ' ';
          break;
        default:
          result += next;
      }
      i++;
      continue;
    }
    
    if (char === '[') {
      // Character class - find closing bracket
      let classEnd = pattern.indexOf(']', i);
      if (classEnd === -1) {
        result += char;
        i++;
        continue;
      }
      
      const charClass = pattern.slice(i + 1, classEnd);
      let chars = charClass;
      
      // Handle negation
      if (chars.startsWith('^')) {
        chars = chars.slice(1);
      }
      
      // Handle ranges (simplified)
      chars = chars.replace(/([a-z])-([a-z])/g, (_, a, b) => {
        const start = a.charCodeAt(0);
        const end = b.charCodeAt(0);
        let range = '';
        for (let c = start; c <= end; c++) {
          range += String.fromCharCode(c);
        }
        return range;
      });
      
      chars = chars.replace(/([A-Z])-([A-Z])/g, (_, a, b) => {
        const start = a.charCodeAt(0);
        const end = b.charCodeAt(0);
        let range = '';
        for (let c = start; c <= end; c++) {
          range += String.fromCharCode(c);
        }
        return range;
      });
      
      chars = chars.replace(/([0-9])-([0-9])/g, (_, a, b) => {
        const start = parseInt(a);
        const end = parseInt(b);
        let range = '';
        for (let c = start; c <= end; c++) {
          range += String(c);
        }
        return range;
      });
      
      result += chars[randomInt(random, 0, chars.length - 1)];
      i = classEnd;
      continue;
    }
    
    if (char === '(') {
      // Group - find closing parenthesis
      let groupEnd = pattern.indexOf(')', i);
      if (groupEnd === -1) {
        result += char;
        i++;
        continue;
      }
      
      const group = pattern.slice(i + 1, groupEnd);
      // Handle alternation
      const alternatives = group.split('|');
      const choice = randomPick(random, alternatives) || '';
      result += choice;
      i = groupEnd;
      continue;
    }
    
    // Handle quantifiers
    if (result.length > 0) {
      const lastChar = result[result.length - 1];
      
      if (char === '*') {
        // Zero or more - sometimes remove the last char
        if (random() > 0.5) {
          result = result.slice(0, -1);
        }
        result = result.slice(0, -1); // Remove the quantifier
        continue;
      }
      
      if (char === '+') {
        // One or more - repeat last char random times
        const repeat = randomInt(random, 0, 3);
        result += lastChar.repeat(repeat);
        result = result.slice(0, -1); // Remove the quantifier
        continue;
      }
      
      if (char === '?') {
        // Zero or one - randomly remove last char
        if (random() > 0.5) {
          result = result.slice(0, -1);
        }
        result = result.slice(0, -1); // Remove the quantifier
        continue;
      }
    }
    
    // Literal character
    result += char;
  }
  
  return result;
}
