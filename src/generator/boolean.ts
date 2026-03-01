/**
 * Boolean Generator
 */

import { SeededRandom, randomPick } from '../utils/seed';
import { JSONSchemaBoolean } from '../types/schema';

/**
 * Generate a random boolean from a schema
 * @param schema - Boolean schema
 * @param random - Random function
 * @returns Generated boolean value
 */
export function generateBoolean(schema: JSONSchemaBoolean, random: SeededRandom): boolean {
  // Handle const
  if (schema.const !== undefined) {
    return Boolean(schema.const);
  }
  
  // Handle enum
  if (schema.enum && schema.enum.length > 0) {
    const value = randomPick(random, schema.enum as boolean[]);
    return value !== undefined ? Boolean(value) : false;
  }
  
  // Default: random boolean
  return random() > 0.5;
}
