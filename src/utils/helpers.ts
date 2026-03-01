/**
 * Helper Utilities
 */

import { JSONSchema, JSONSchemaType, JSONSchemaObject, JSONSchemaArray, JSONSchemaProperty } from '../types/schema';

/**
 * Deep clone an object
 * @param obj - Object to clone
 * @returns Cloned object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }
  
  if (obj instanceof Object) {
    const cloned: Record<string, unknown> = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        cloned[key] = deepClone((obj as Record<string, unknown>)[key]);
      }
    }
    return cloned as T;
  }
  
  return obj;
}

/**
 * Get the type of a value
 * @param value - Value to check
 * @returns Type string
 */
export function getType(value: unknown): string {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

/**
 * Check if a value is a plain object
 * @param value - Value to check
 * @returns True if plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Detect the JSON Schema type from a value
 * @param value - Value to detect type from
 * @returns JSON Schema type
 */
export function detectSchemaType(value: unknown): JSONSchemaType | undefined {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  
  const type = typeof value;
  
  switch (type) {
    case 'string':
      return 'string';
    case 'number':
      if (Number.isInteger(value)) return 'integer';
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'object':
      return 'object';
    default:
      return undefined;
  }
}

/**
 * Check if a schema is a boolean schema (true or false)
 * @param schema - Schema to check
 * @returns True if boolean schema
 */
export function isBooleanSchema(schema: JSONSchema | boolean): schema is boolean {
  return typeof schema === 'boolean';
}

/**
 * Check if a schema defines required properties
 * @param schema - Schema to check
 * @returns True if schema has required properties
 */
export function hasRequiredProperties(schema: JSONSchema): boolean {
  if (isBooleanSchema(schema)) return false;
  const objSchema = schema as JSONSchemaObject;
  return Array.isArray(objSchema.required) && objSchema.required.length > 0;
}

/**
 * Get required property names from a schema
 * @param schema - Schema to get required from
 * @returns Array of required property names
 */
export function getRequiredProperties(schema: JSONSchema): string[] {
  if (isBooleanSchema(schema)) return [];
  const objSchema = schema as JSONSchemaObject;
  return objSchema.required || [];
}

/**
 * Check if a property is required
 * @param schema - Schema to check
 * @param propertyName - Property name
 * @returns True if property is required
 */
export function isPropertyRequired(schema: JSONSchema, propertyName: string): boolean {
  const required = getRequiredProperties(schema);
  return required.includes(propertyName);
}

/**
 * Get a property schema from an object schema
 * @param schema - Object schema
 * @param propertyName - Property name
 * @returns Property schema or undefined
 */
export function getPropertySchema(
  schema: JSONSchema,
  propertyName: string
): JSONSchemaProperty | undefined {
  if (isBooleanSchema(schema)) return undefined;
  const objSchema = schema as JSONSchemaObject;
  if (!objSchema.properties) return undefined;
  return objSchema.properties[propertyName];
}

/**
 * Check if additional properties are allowed
 * @param schema - Object schema
 * @returns True if additional properties allowed
 */
export function allowsAdditionalProperties(schema: JSONSchema): boolean {
  if (isBooleanSchema(schema)) return schema;
  const objSchema = schema as JSONSchemaObject;
  if (objSchema.additionalProperties === undefined) return true;
  return objSchema.additionalProperties !== false;
}

/**
 * Get the items schema from an array schema
 * @param schema - Array schema
 * @returns Items schema or undefined
 */
export function getItemsSchema(schema: JSONSchema): JSONSchemaProperty | undefined {
  if (isBooleanSchema(schema)) return undefined;
  const arrSchema = schema as JSONSchemaArray;
  return arrSchema.items;
}

/**
 * Merge default values from schema
 * @param schema - Schema to get default from
 * @returns Default value or undefined
 */
export function getDefaultValue(schema: JSONSchema): unknown {
  if (isBooleanSchema(schema)) return undefined;
  return (schema as { default?: unknown }).default;
}

/**
 * Get enum values from schema
 * @param schema - Schema to get enum from
 * @returns Enum values or undefined
 */
export function getEnumValues<T = unknown>(schema: JSONSchema): T[] | undefined {
  if (isBooleanSchema(schema)) return undefined;
  const enumVal = (schema as { enum?: unknown[] }).enum;
  return enumVal as T[] | undefined;
}

/**
 * Get const value from schema
 * @param schema - Schema to get const from
 * @returns Const value or undefined
 */
export function getConstValue<T = unknown>(schema: JSONSchema): T | undefined {
  if (isBooleanSchema(schema)) return undefined;
  return (schema as { const?: unknown }).const as T | undefined;
}

/**
 * Check if schema has enum
 * @param schema - Schema to check
 * @returns True if schema has enum
 */
export function hasEnum(schema: JSONSchema): boolean {
  if (isBooleanSchema(schema)) return false;
  const enumVal = (schema as { enum?: unknown[] }).enum;
  return Array.isArray(enumVal) && enumVal.length > 0;
}

/**
 * Check if schema has const
 * @param schema - Schema to check
 * @returns True if schema has const
 */
export function hasConst(schema: JSONSchema): boolean {
  if (isBooleanSchema(schema)) return false;
  return (schema as { const?: unknown }).const !== undefined;
}

/**
 * Simple schema validation - check if a value matches a schema
 * @param value - Value to validate
 * @param schema - Schema to validate against
 * @returns True if valid
 */
export function valueMatchesSchema(value: unknown, schema: JSONSchema): boolean {
  if (isBooleanSchema(schema)) {
    return schema;
  }
  
  const valueType = detectSchemaType(value);
  const typeProp = (schema as { type?: string | string[] }).type;
  
  if (typeProp) {
    if (Array.isArray(typeProp)) {
      if (!typeProp.includes(valueType as string)) return false;
    } else {
      if (typeProp !== valueType) return false;
    }
  }
  
  return true;
}

/**
 * Coerce a value to match a schema type if possible
 * @param value - Value to coerce
 * @param targetType - Target type
 * @returns Coerced value or original
 */
export function coerceValue(value: unknown, targetType: JSONSchemaType): unknown {
  if (targetType === 'string') return String(value);
  if (targetType === 'number' || targetType === 'integer') {
    const num = Number(value);
    if (!isNaN(num)) {
      return targetType === 'integer' ? Math.floor(num) : num;
    }
  }
  if (targetType === 'boolean') return Boolean(value);
  if (targetType === 'null') return null;
  return value;
}
