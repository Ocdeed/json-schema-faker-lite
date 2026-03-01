/**
 * Null Generator
 */

import { SeededRandom } from '../utils/seed';
import { JSONSchemaNull } from '../types/schema';

/**
 * Generate a null value from a schema
 * @param schema - Null schema
 * @param _random - Random function (unused for null type)
 * @returns Generated null value
 */
export function generateNull(schema: JSONSchemaNull, _random: SeededRandom): null {
  // Handle const
  if (schema.const !== undefined) {
    return schema.const as null;
  }
  
  // Handle enum - just return null for simplicity
  // (enums on null type are unusual)
  if (schema.enum && schema.enum.length > 0) {
    return null;
  }
  
  // Null schema always returns null
  return null;
}
