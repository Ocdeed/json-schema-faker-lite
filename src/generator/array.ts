/**
 * Array Generator
 */

import { SeededRandom, randomPick, randomInt } from '../utils/seed';
import { JSONSchemaArray, JSONSchemaProperty } from '../types/schema';
import { GenerationContext } from '../types/options';
import { isBooleanSchema, deepClone } from '../utils/helpers';
import { generateValue } from './index';

/**
 * Generate a random array from a schema
 * @param schema - Array schema
 * @param random - Random function
 * @param context - Generation context
 * @returns Generated array value
 */
export function generateArray(
  schema: JSONSchemaArray,
  random: SeededRandom,
  context: GenerationContext
): unknown[] {
  // Handle const
  if (schema.const !== undefined) {
    return deepClone(schema.const as unknown[]);
  }
  
  // Handle enum
  if (schema.enum && schema.enum.length > 0) {
    const value = randomPick(random, schema.enum as unknown[][]);
    return value !== undefined ? deepClone(value) : [];
  }
  
  // Check if we've exceeded max depth
  if (context.depth >= context.maxDepth) {
    return [];
  }
  
  // Determine array length
  const minItems = schema.minItems ?? 1;
  const maxItems = schema.maxItems ?? context.arrayLength;
  
  // Ensure min <= max
  const effectiveMin = Math.max(1, Math.min(minItems, maxItems));
  const effectiveMax = Math.max(effectiveMin, maxItems);
  
  // Generate random length
  const length = randomInt(random, effectiveMin, effectiveMax);
  
  // Get items schema
  const itemsSchema = schema.items;
  
  // If no items schema, generate empty array or with default values
  if (itemsSchema === undefined) {
    return [];
  }
  
  const result: unknown[] = [];
  
  for (let i = 0; i < length; i++) {
    // Determine the schema for this item
    let itemSchema: JSONSchemaProperty = itemsSchema;
    
    // Handle boolean schemas (true = any, false = none)
    if (isBooleanSchema(itemsSchema)) {
      if (itemsSchema === false) {
        continue;
      }
      // true means any - use default string schema
      itemSchema = { type: 'string' } as JSONSchemaProperty;
    }
    
    const item = generateValue(itemSchema, random, {
      ...context,
      depth: context.depth + 1,
      seedOffset: context.seedOffset + i,
    });
    
    result.push(item);
  }
  
  // Handle uniqueItems
  if (schema.uniqueItems && result.length > 1) {
    // Simple deduplication for primitive types
    const seen = new Set();
    const unique: unknown[] = [];
    
    for (const item of result) {
      const key = JSON.stringify(item);
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    }
    
    // If unique constraint removed too many items, add more
    while (unique.length < effectiveMin && result.length > unique.length) {
      for (const item of result) {
        if (unique.length >= effectiveMin) break;
        const key = JSON.stringify(item);
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(item);
        }
      }
    }
    
    return unique;
  }
  
  return result;
}
