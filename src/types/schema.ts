/**
 * JSON Schema Type Definitions
 * Based on JSON Schema draft-07
 */

export type JSONSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array' | 'null';

export type JSONSchemaFormat = 
  | 'email'
  | 'uuid'
  | 'date-time'
  | 'date'
  | 'time'
  | 'uri'
  | 'url'
  | 'hostname'
  | 'ipv4'
  | 'ipv6'
  | 'regex'
  | 'json-pointer'
  | 'relative-json-pointer'
  | 'uri-reference'
  | 'uri-template';

/**
 * Base schema properties
 */
export interface JSONSchemaBase {
  enum?: unknown[];
  const?: unknown;
  default?: unknown;
  [key: string]: unknown;
}

/**
 * String schema keywords
 */
export interface JSONSchemaString extends JSONSchemaBase {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: JSONSchemaFormat;
}

/**
 * Number schema keywords
 */
export interface JSONSchemaNumber extends JSONSchemaBase {
  type: 'number';
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
}

/**
 * Integer schema keywords
 */
export interface JSONSchemaInteger extends JSONSchemaBase {
  type: 'integer';
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
}

/**
 * Boolean schema keywords
 */
export interface JSONSchemaBoolean extends JSONSchemaBase {
  type: 'boolean';
}

/**
 * Object property schema
 */
export type JSONSchemaProperty = JSONSchema | boolean;

/**
 * Object schema keywords
 */
export interface JSONSchemaObject extends JSONSchemaBase {
  type: 'object';
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  additionalProperties?: JSONSchemaProperty | boolean;
  minProperties?: number;
  maxProperties?: number;
}

/**
 * Array schema keywords
 */
export interface JSONSchemaArray extends JSONSchemaBase {
  type: 'array';
  items?: JSONSchemaProperty;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
}

/**
 * Null schema keywords
 */
export interface JSONSchemaNull extends JSONSchemaBase {
  type: 'null';
}

/**
 * Union of all JSON Schema types
 */
export type JSONSchema = 
  | JSONSchemaString 
  | JSONSchemaNumber 
  | JSONSchemaInteger 
  | JSONSchemaBoolean 
  | JSONSchemaObject 
  | JSONSchemaArray 
  | JSONSchemaNull
  | JSONSchemaBase;

/**
 * Type guard to check if schema is a string schema
 */
export function isStringSchema(schema: JSONSchema): schema is JSONSchemaString {
  return (schema as JSONSchemaString).type === 'string';
}

/**
 * Type guard to check if schema is a number schema
 */
export function isNumberSchema(schema: JSONSchema): schema is JSONSchemaNumber {
  return (schema as JSONSchemaNumber).type === 'number';
}

/**
 * Type guard to check if schema is an integer schema
 */
export function isIntegerSchema(schema: JSONSchema): schema is JSONSchemaInteger {
  return (schema as JSONSchemaInteger).type === 'integer';
}

/**
 * Type guard to check if schema is a boolean schema
 */
export function isBooleanSchema(schema: JSONSchema): schema is JSONSchemaBoolean {
  return (schema as JSONSchemaBoolean).type === 'boolean';
}

/**
 * Type guard to check if schema is an object schema
 */
export function isObjectSchema(schema: JSONSchema): schema is JSONSchemaObject {
  return (schema as JSONSchemaObject).type === 'object';
}

/**
 * Type guard to check if schema is an array schema
 */
export function isArraySchema(schema: JSONSchema): schema is JSONSchemaArray {
  return (schema as JSONSchemaArray).type === 'array';
}

/**
 * Type guard to check if schema is a null schema
 */
export function isNullSchema(schema: JSONSchema): schema is JSONSchemaNull {
  return (schema as JSONSchemaNull).type === 'null';
}
