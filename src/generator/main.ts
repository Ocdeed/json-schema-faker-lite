/**
 * Main Generator - Public API
 * The generate() function that users will call
 */

import { createRandom } from '../utils/seed';
import { JSONSchema } from '../types/schema';
import { GenerateOptions, GenerationContext, DEFAULT_CONTEXT } from '../types/options';
import { generateValue } from './index';

/**
 * Generate mock data from a JSON Schema
 * @param schema - The JSON Schema to generate from
 * @param options - Generation options (optional)
 * @returns Generated mock data
 * 
 * @example
 * import { generate } from 'json-schema-faker-lite'
 * 
 * const userSchema = {
 *   type: 'object',
 *   properties: {
 *     id: { type: 'integer', minimum: 1 },
 *     name: { type: 'string', minLength: 3 },
 *     email: { type: 'string', format: 'email' },
 *     isActive: { type: 'boolean' }
 *   },
 *   required: ['id', 'name', 'email']
 * }
 * 
 * const mockUser = generate(userSchema)
 * console.log(mockUser)
 * // { id: 42, name: 'abc123', email: 'john@example.com', isActive: true }
 * 
 * // Generate with seed for deterministic output
 * const mockUser2 = generate(userSchema, { seed: 123 })
 * 
 * // Generate multiple records
 * const users = generate({ type: 'array', items: userSchema }, { arrayLength: 10 })
 */
export function generate(schema: JSONSchema, options?: GenerateOptions): unknown {
  // Validate schema
  if (schema === undefined || schema === null) {
    throw new Error('Schema is required');
  }

  // Create random function with optional seed
  const random = createRandom(options?.seed);
  
  // Build generation context
  const context: GenerationContext = {
    depth: 0,
    maxDepth: options?.maxDepth ?? DEFAULT_CONTEXT.maxDepth,
    seedOffset: 0,
    arrayLength: options?.arrayLength ?? DEFAULT_CONTEXT.arrayLength,
    useDefaults: options?.useDefaults ?? DEFAULT_CONTEXT.useDefaults,
  };

  // Generate the value
  return generateValue(schema, random, context);
}

/**
 * Generate multiple values from a schema (array shorthand)
 * @param schema - The JSON Schema to generate from
 * @param count - Number of items to generate
 * @param options - Generation options (optional)
 * @returns Array of generated mock data
 * 
 * @example
 * const users = generateArray(userSchema, 10)
 */
export function generateArray(schema: JSONSchema, count: number, options?: GenerateOptions): unknown[] {
  const result: unknown[] = [];
  
  for (let i = 0; i < count; i++) {
    result.push(generate(schema, options));
  }
  
  return result;
}

export { generateValue } from './index';
export { generateString } from './string';
export { generateNumber } from './number';
export { generateBoolean } from './boolean';
export { generateObject } from './object';
export { generateArray as generateArrayValue } from './array';
export { generateNull } from './null';
