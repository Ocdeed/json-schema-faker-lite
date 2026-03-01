/**
 * Number Generator
 */

import { SeededRandom, randomInt, randomFloat, randomPick } from '../utils/seed';
import { JSONSchemaNumber, JSONSchemaInteger } from '../types/schema';

/**
 * Union type for number and integer schemas
 */
export type NumberSchema = JSONSchemaNumber | JSONSchemaInteger;

/**
 * Check if schema is for integers only
 */
function isInteger(schema: NumberSchema): boolean {
  return schema.type === 'integer';
}

/**
 * Generate a random number from a schema
 * @param schema - Number or integer schema
 * @param random - Random function
 * @returns Generated number value
 */
export function generateNumber(schema: NumberSchema, random: SeededRandom): number {
  // Handle const
  if (schema.const !== undefined) {
    return Number(schema.const);
  }
  
  // Handle enum
  if (schema.enum && schema.enum.length > 0) {
    const value = randomPick(random, schema.enum as number[]);
    return value !== undefined ? Number(value) : 0;
  }
  
  // Calculate bounds
  const minimum = schema.minimum ?? 0;
  const maximum = schema.maximum ?? 100;
  const exclusiveMinimum = schema.exclusiveMinimum;
  const exclusiveMaximum = schema.exclusiveMaximum;
  const multipleOf = schema.multipleOf;
  
  // Determine effective min/max considering exclusivity
  let effectiveMin = minimum;
  let effectiveMax = maximum;
  
  if (exclusiveMinimum !== undefined) {
    effectiveMin = exclusiveMinimum + (isInteger(schema) ? 1 : 0.0001);
  }
  
  if (exclusiveMaximum !== undefined) {
    effectiveMax = exclusiveMaximum - (isInteger(schema) ? 1 : 0.0001);
  }
  
  // Ensure min <= max
  if (effectiveMin > effectiveMax) {
    [effectiveMin, effectiveMax] = [effectiveMax, effectiveMin];
  }
  
  // Generate base value
  let value: number;
  
  if (multipleOf !== undefined && multipleOf > 0) {
    // Generate value respecting multipleOf
    value = generateMultipleOf(random, effectiveMin, effectiveMax, multipleOf, isInteger(schema));
  } else if (isInteger(schema)) {
    // Generate integer
    value = randomInt(random, Math.ceil(effectiveMin), Math.floor(effectiveMax));
  } else {
    // Generate float
    value = randomFloat(random, effectiveMin, effectiveMax);
    // Round to reasonable precision
    value = Math.round(value * 100) / 100;
  }
  
  return value;
}

/**
 * Generate a number that is a multiple of the given value
 */
function generateMultipleOf(
  random: SeededRandom,
  min: number,
  max: number,
  multipleOf: number,
  integer: boolean
): number {
  // Calculate the range in terms of multiples
  const minMultiple = Math.ceil(min / multipleOf);
  const maxMultiple = Math.floor(max / multipleOf);
  
  if (minMultiple > maxMultiple) {
    // Can't satisfy multipleOf constraint - return min
    return min;
  }
  
  // Pick a random multiple
  const chosenMultiple = randomInt(random, minMultiple, maxMultiple);
  let value = chosenMultiple * multipleOf;
  
  // If integer type, ensure it's actually an integer
  if (integer) {
    value = Math.round(value);
  }
  
  return value;
}
