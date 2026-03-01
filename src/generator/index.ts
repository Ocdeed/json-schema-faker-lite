/**
 * Generator Index
 * Main generation logic
 */

import { SeededRandom } from '../utils/seed';
import { JSONSchema, isStringSchema, isNumberSchema, isIntegerSchema, isBooleanSchema, isObjectSchema, isArraySchema, isNullSchema } from '../types/schema';
import { GenerationContext } from '../types/options';
import { isBooleanSchema as isBoolSchema } from '../utils/helpers';

import { generateString } from './string';
import { generateNumber } from './number';
import { generateBoolean } from './boolean';
import { generateObject } from './object';
import { generateArray } from './array';
import { generateNull } from './null';

/**
 * Generate a value from a JSON Schema
 * @param schema - JSON Schema
 * @param random - Random function
 * @param context - Generation context
 * @returns Generated value
 */
export function generateValue(
  schema: JSONSchema | boolean,
  random: SeededRandom,
  context: GenerationContext
): unknown {
  // Handle boolean schemas
  // true = any value, false = no value (return empty)
  if (isBoolSchema(schema)) {
    if (schema === false) {
      return undefined;
    }
    // For true, generate a default string
    return { type: 'string' };
  }
  
  // Handle const first (highest priority)
  if ('const' in schema && schema.const !== undefined) {
    return schema.const;
  }
  
  // Handle default value if enabled
  if (context.useDefaults && 'default' in schema && schema.default !== undefined) {
    return schema.default;
  }
  
  // Handle enum (pick random value)
  if ('enum' in schema && Array.isArray(schema.enum) && schema.enum.length > 0) {
    const enumIndex = Math.floor(random() * schema.enum.length);
    return schema.enum[enumIndex];
  }
  
  // Route to appropriate generator based on type
  if (isStringSchema(schema)) {
    return generateString(schema, random);
  }
  
  if (isIntegerSchema(schema)) {
    return generateNumber(schema, random);
  }
  
  if (isNumberSchema(schema)) {
    return generateNumber(schema, random);
  }
  
  if (isBooleanSchema(schema)) {
    return generateBoolean(schema, random);
  }
  
  if (isObjectSchema(schema)) {
    return generateObject(schema, random, context);
  }
  
  if (isArraySchema(schema)) {
    return generateArray(schema, random, context);
  }
  
  if (isNullSchema(schema)) {
    return generateNull(schema, random);
  }
  
  // Fallback for schemas without type
  // Try to generate based on available properties
  if ('properties' in schema && schema.properties) {
    return generateObject(schema as Parameters<typeof generateObject>[0], random, context);
  }
  
  if ('items' in schema) {
    return generateArray(schema as Parameters<typeof generateArray>[0], random, context);
  }
  
  // Ultimate fallback - return empty string
  return '';
}

// Export individual generators
export { generateString } from './string';
export { generateNumber } from './number';
export { generateBoolean } from './boolean';
export { generateObject } from './object';
export { generateArray } from './array';
export { generateNull } from './null';
