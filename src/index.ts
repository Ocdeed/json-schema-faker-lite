/**
 * json-schema-faker-lite
 * A lightweight, TypeScript-first package to generate realistic mock data from JSON Schema definitions
 */

// Main API
export { generate, generateArray } from './generator/main';

// Types
export type { JSONSchema, JSONSchemaType, JSONSchemaFormat } from './types/schema';
export type { JSONSchemaString, JSONSchemaNumber, JSONSchemaInteger, JSONSchemaBoolean, JSONSchemaObject, JSONSchemaArray, JSONSchemaNull } from './types/schema';
export type { GenerateOptions, GenerationContext } from './types/options';

// Re-export type guards
export { isStringSchema, isNumberSchema, isIntegerSchema, isBooleanSchema, isObjectSchema, isArraySchema, isNullSchema } from './types/schema';
