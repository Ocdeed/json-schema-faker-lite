/**
 * Object Generator
 */

import { SeededRandom, randomPick, randomInt } from '../utils/seed';
import { JSONSchemaObject, JSONSchemaProperty } from '../types/schema';
import { GenerationContext } from '../types/options';
import { isBooleanSchema, deepClone } from '../utils/helpers';
import { generateValue } from './index';

/**
 * Generate a random object from a schema
 * @param schema - Object schema
 * @param random - Random function
 * @param context - Generation context
 * @returns Generated object value
 */
export function generateObject(
  schema: JSONSchemaObject,
  random: SeededRandom,
  context: GenerationContext
): Record<string, unknown> {
  // Handle const
  if (schema.const !== undefined) {
    return deepClone(schema.const as Record<string, unknown>) || {};
  }
  
  // Handle enum
  if (schema.enum && schema.enum.length > 0) {
    const value = randomPick(random, schema.enum as Record<string, unknown>[]);
    return value !== undefined ? deepClone(value) : {};
  }
  
  // Check if we've exceeded max depth
  if (context.depth >= context.maxDepth) {
    return {};
  }
  
  const result: Record<string, unknown> = {};
  const properties = schema.properties || {};
  const required = schema.required || [];
  const additionalProperties = schema.additionalProperties;
  
  // Generate required properties first
  for (const propName of required) {
    const propSchema = properties[propName];
    if (propSchema !== undefined) {
      result[propName] = generateValue(propSchema, random, {
        ...context,
        depth: context.depth + 1,
        seedOffset: context.seedOffset + 1,
      });
    }
  }
  
  // Generate optional properties (randomly)
  const optionalProps = Object.keys(properties).filter(p => !required.includes(p));
  for (const propName of optionalProps) {
    // Randomly decide whether to include optional property
    if (random() > 0.5) {
      const propSchema = properties[propName];
      result[propName] = generateValue(propSchema, random, {
        ...context,
        depth: context.depth + 1,
        seedOffset: context.seedOffset + 1,
      });
    }
  }
  
  // Handle additional properties
  if (additionalProperties !== false) {
    // Generate some additional properties
    const additionalCount = randomInt(random, 0, 3);
    const usedNames = new Set([...Object.keys(properties)]);
    
    for (let i = 0; i < additionalCount; i++) {
      // Generate a random property name
      const propNames = ['extra', 'data', 'meta', 'info', 'custom', 'field', 'value', 'key'];
      let propName = '';
      
      // Try to find an unused name
      for (let attempt = 0; attempt < 10; attempt++) {
        const base = randomPick(random, propNames) || 'prop';
        const suffix = randomInt(random, 1, 99);
        propName = `${base}${suffix}`;
        
        if (!usedNames.has(propName)) {
          usedNames.add(propName);
          break;
        }
      }
      
      if (propName && !usedNames.has(propName)) {
        usedNames.add(propName);
        
        // Determine the schema for additional property
        let propSchema: JSONSchemaProperty = true;
        
        if (additionalProperties !== undefined && !isBooleanSchema(additionalProperties)) {
          propSchema = additionalProperties;
        }
        
        if (propSchema === true || propSchema === undefined) {
          // Any schema allowed - use default string schema
          propSchema = { type: 'string' } as JSONSchemaProperty;
        }
        
        if (propSchema !== false) {
          result[propName] = generateValue(propSchema, random, {
            ...context,
            depth: context.depth + 1,
            seedOffset: context.seedOffset + 1,
          });
        }
      }
    }
  }
  
  // Handle minProperties/maxProperties
  const currentCount = Object.keys(result).length;
  const minProps = schema.minProperties ?? 0;
  const maxProps = schema.maxProperties ?? 20;
  
  // If we have too few properties, add more
  if (currentCount < minProps && Object.keys(properties).length > currentCount) {
    const needed = minProps - currentCount;
    const remaining = Object.keys(properties).filter(p => !(p in result));
    for (let i = 0; i < Math.min(needed, remaining.length); i++) {
      const propName = remaining[i];
      const propSchema = properties[propName];
      result[propName] = generateValue(propSchema, random, {
        ...context,
        depth: context.depth + 1,
        seedOffset: context.seedOffset + 1,
      });
    }
  }
  
  // If we have too many properties, trim
  if (currentCount > maxProps) {
    const keys = Object.keys(result);
    const toRemove = currentCount - maxProps;
    for (let i = 0; i < toRemove; i++) {
      const keyToRemove = keys[i];
      delete result[keyToRemove];
    }
  }
  
  return result;
}
