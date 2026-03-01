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
 * String schema keywords
 */
export interface JSONSchemaString {
  type: 'string';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  format?: JSONSchemaFormat;
  enum?: string[];
  const?: string;
  default?: string;
  [key: string]: unknown;
}

/**
 * Number schema keywords
 */
export interface JSONSchemaNumber {
  type: 'number';
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  enum?: number[];
  const?: number;
  default?: number;
  [key: string]: unknown;
}

/**
 * Integer schema keywords
 */
export interface JSONSchemaInteger {
  type: 'integer';
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
  multipleOf?: number;
  enum?: number[];
  const?: number;
  default?: number;
  [key: string]: unknown;
}

/**
 * Boolean schema keywords
 */
export interface JSONSchemaBoolean {
  type: 'boolean';
  enum?: boolean[];
  const?: boolean;
  default?: boolean;
  [key: string]: unknown;
}

/**
 * Object property schema
 */
export type JSONSchemaProperty = JSONSchema | boolean;

/**
 * Object schema keywords
 */
export interface JSONSchemaObject {
  type: 'object';
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
  additionalProperties?: JSONSchemaProperty | boolean;
  minProperties?: number;
  maxProperties?: number;
  enum?: object[];
  const?: object;
  default?: object;
  [key: string]: unknown;
}

/**
 * Array schema keywords
 */
export interface JSONSchemaArray {
  type: 'array';
  items?: JSONSchemaProperty;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  enum?: unknown[][];
  const?: unknown[];
  default?: unknown[];
  [key: string]: unknown;
}

/**
 * Null schema keywords
 */
export interface JSONSchemaNull {
  type: 'null';
  enum?: null[];
  const?: null;
  default?: null;
  [key: string]: unknown;
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
  | (Omit<JSONSchemaString, 'type'> & { type?: never })
  | (Omit<JSONSchemaNumber, 'type'> & { type?: never })
  | (Omit<JSONSchemaInteger, 'type'> & { type?: never })
  | (Omit<JSONSchemaBoolean, 'type'> & { type?: never })
  | (Omit<JSONSchemaObject, 'type'> & { type?: never })
  | (Omit<JSONSchemaArray, 'type'> & { type?: never })
  | (Omit<JSONSchemaNull, 'type'> & { type?: never });

/**
 * Type guard to check if schema is a string schema
 */
export function isStringSchema(schema: JSONSchema): schema is JSONSchemaString {
  return schema.type === 'string';
}

/**
 * Type guard to check if schema is a number schema
 */
export function isNumberSchema(schema: JSONSchema): schema is JSONSchemaNumber {
  return schema.type === 'number';
}

/**
 * Type guard to check if schema is an integer schema
 */
export function isIntegerSchema(schema: JSONSchema): schema is JSONSchemaInteger {
  return schema.type === 'integer';
}

/**
 * Type guard to check if schema is a boolean schema
 */
export function isBooleanSchema(schema: JSONSchema): schema is JSONSchemaBoolean {
  return schema.type === 'boolean';
}

/**
 * Type guard to check if schema is an object schema
 */
export function isObjectSchema(schema: JSONSchema): schema is JSONSchemaObject {
  return schema.type === 'object';
}

/**
 * Type guard to check if schema is an array schema
 */
export function isArraySchema(schema: JSONSchema): schema is JSONSchemaArray {
  return schema.type === 'array';
}

/**
 * Type guard to check if schema is a null schema
 */
export function isNullSchema(schema: JSONSchema): schema is JSONSchemaNull {
  return schema.type === 'null';
}
