# json-schema-faker-lite Development Plan

## Project Overview
A lightweight, TypeScript-first npm package that generates realistic mock data from JSON Schema definitions. Zero dependencies, deterministic seeding support, and compatible with Node.js and browser environments.

**Repository:** https://github.com/Ocdeed/json-schema-faker-lite.git

---

## Phase 1: Project Setup
**Status:** Not Started

### Tasks:
- [ ] Initialize npm project with `npm init`
- [ ] Install dev dependencies: `typescript`, `esbuild`, `@types/node`
- [ ] Create `tsconfig.json` with strict mode enabled
- [ ] Create `package.json` with proper configuration:
  - Set main, module, types fields
  - Add build scripts (CJS, MJS, declarations)
  - Configure keywords, license, repository
- [ ] Initialize git repository
- [ ] Create `.gitignore` file
- [ ] Initial commit

### Deliverables:
- Working TypeScript development environment
- Configured build pipeline
- Git repository initialized

---

## Phase 2: Type Definitions
**Status:** Not Started

### Tasks:
- [ ] Create `src/types/schema.ts`:
  - JSONSchema interface
  - Type definitions (string, number, integer, boolean, object, array, null)
  - String keywords (minLength, maxLength, pattern, format, enum, const, default)
  - Number keywords (minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf, enum, const, default)
  - Object keywords (properties, required, additionalProperties, enum, const, default)
  - Array keywords (items, minItems, maxItems, enum, const, default)
  - Common keywords (enum, const, default)
- [ ] Create `src/types/options.ts`:
  - GenerateOptions interface with seed, locale, maxDepth, arrayLength, useDefaults
- [ ] Create `src/types/index.ts` - exports

### Deliverables:
- Complete TypeScript type definitions for JSON Schema
- GenerateOptions type for API

---

## Phase 3: Utility Modules
**Status:** Not Started

### Tasks:
- [ ] Create `src/utils/seed.ts`:
  - Implement mulberry32 PRNG algorithm
  - Seeded random number generation functions
  - Helper to hash seed string to number
- [ ] Create `src/utils/random.ts`:
  - Random integer within range
  - Random float within range
  - Random string from pattern
  - Random array element pick
- [ ] Create `src/utils/helpers.ts`:
  - Deep clone function
  - Type detection utilities
  - Schema type detection
  - Required fields check
- [ ] Create `src/utils/index.ts` - exports

### Deliverables:
- Seeded random number generation
- Reusable utility functions

---

## Phase 4: Format Handlers
**Status:** Not Started

### Tasks:
- [ ] Create `src/formats/email.ts`:
  - Generate valid email addresses (e.g., user@example.com)
- [ ] Create `src/formats/uuid.ts`:
  - Generate RFC 4122 compliant UUIDs (v4)
- [ ] Create `src/formats/date.ts`:
  - Generate ISO 8601 formatted dates
- [ ] Create `src/formats/url.ts`:
  - Generate valid URLs (e.g., https://example.com/page)
- [ ] Create `src/formats/index.ts`:
  - Format registry/lookup system
  - Export all formatters

### Deliverables:
- All required format generators
- Easy-to-extend format system

---

## Phase 5: Type Generators
**Status:** Not Started

### Tasks:
- [ ] Create `src/generator/string.ts`:
  - Generate random strings
  - Apply minLength/maxLength constraints
  - Apply pattern regex
  - Handle format (email, uuid, date-time, url)
  - Handle enum/const/default
- [ ] Create `src/generator/number.ts`:
  - Generate integers and floats
  - Apply minimum/maximum bounds
  - Apply exclusiveMinimum/exclusiveMaximum
  - Apply multipleOf constraint
  - Handle enum/const/default
- [ ] Create `src/generator/boolean.ts`:
  - Generate true/false values
  - Handle enum/const/default
- [ ] Create `src/generator/object.ts`:
  - Generate objects with properties
  - Handle required fields
  - Handle additionalProperties
  - Handle enum/const/default
- [ ] Create `src/generator/array.ts`:
  - Generate arrays with items
  - Apply minItems/maxItems constraints
  - Handle enum/const/default
- [ ] Create `src/generator/null.ts`:
  - Generate null values

### Deliverables:
- All type generators with constraint support

---

## Phase 6: Main Generator
**Status:** Not Started

### Tasks:
- [ ] Create `src/generator/index.ts`:
  - Main `generate()` function
  - Schema type detection and routing
  - Recursive generation with depth tracking
  - maxDepth protection against infinite recursion
  - Default value merging
  - Array length handling via arrayLength option
- [ ] Implement error handling for unsupported schema features

### Deliverables:
- Complete generate() API implementation

---

## Phase 7: Entry Point
**Status:** Not Started

### Tasks:
- [ ] Create `src/index.ts`:
  - Export generate function
  - Export types
  - Export options interface
- [ ] Test basic import/export

### Deliverables:
- Working package entry point

---

## Phase 8: Build Configuration
**Status:** Not Started

### Tasks:
- [ ] Configure esbuild for CommonJS output (`dist/index.cjs`)
- [ ] Configure esbuild for ES Modules output (`dist/index.mjs`)
- [ ] Generate TypeScript declarations (`dist/index.d.ts`)
- [ ] Update package.json with proper exports
- [ ] Test build outputs

### Deliverables:
- Working CJS and MJS builds
- Type declarations

---

## Phase 9: Documentation
**Status:** Not Started

### Tasks:
- [ ] Create README.md:
  - Installation instructions (npm, yarn, pnpm)
  - Basic usage examples
  - Advanced options (seed, maxDepth, arrayLength, useDefaults)
  - Supported schema features list
  - Limitations section
  - API reference
  - Contribution guide
- [ ] Add badges (npm version, build status)

### Deliverables:
- Complete documentation

---

## Phase 10: Testing & Release
**Status:** Not Started

### Tasks:
- [ ] Create example test files
- [ ] Test with real-world schemas
- [ ] Verify deterministic output with seeds
- [ ] Publish to npm (optional)
- [ ] Create GitHub release

### Deliverables:
- Tested package
- Published to npm (if desired)

---

## Implementation Order Summary

```
Phase 1: Project Setup
Phase 2: Type Definitions  
Phase 3: Utility Modules
Phase 4: Format Handlers
Phase 5: Type Generators
Phase 6: Main Generator
Phase 7: Entry Point
Phase 8: Build Configuration
Phase 9: Documentation
Phase 10: Testing & Release
```

---

## Notes

- Each phase should be committed to GitHub separately
- Use descriptive commit messages
- Ensure tests pass before each commit
- Maintain backward compatibility if adding features later
