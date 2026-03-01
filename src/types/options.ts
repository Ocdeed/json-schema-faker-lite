/**
 * Generate Options Type Definitions
 */

/**
 * Options for the generate function
 */
export interface GenerateOptions {
  /**
   * Seed for deterministic random generation.
   * Same seed + same schema = same output.
   */
  seed?: number;
  
  /**
   * Locale for generated data (reserved for future use).
   * Currently not implemented.
   */
  locale?: string;
  
  /**
   * Maximum depth for nested object/array generation.
   * Prevents infinite recursion.
   * @default 10
   */
  maxDepth?: number;
  
  /**
   * Default number of items to generate for arrays.
   * @default 3
   */
  arrayLength?: number;
  
  /**
   * Whether to use default values from schema.
   * @default true
   */
  useDefaults?: boolean;
}

/**
 * Internal context used during generation
 */
export interface GenerationContext {
  /**
   * Current depth in nested structure
   */
  depth: number;
  
  /**
   * Maximum allowed depth
   */
  maxDepth: number;
  
  /**
   * Seed offset for deterministic generation
   */
  seedOffset: number;
  
  /**
   * Number of items to generate for arrays
   */
  arrayLength: number;
  
  /**
   * Whether to use default values
   */
  useDefaults: boolean;
}

/**
 * Default generation context values
 */
export const DEFAULT_CONTEXT: Omit<GenerationContext, 'seedOffset'> = {
  depth: 0,
  maxDepth: 10,
  arrayLength: 3,
  useDefaults: true,
};
