# json-schema-faker-lite

A lightweight, TypeScript-first npm package that generates realistic mock data from JSON Schema definitions. Zero dependencies, deterministic seeding support, and compatible with Node.js and browser environments.

[![npm version](https://img.shields.io/npm/v/json-schema-faker-lite.svg)](https://www.npmjs.com/package/json-schema-faker-lite)
[![Build Status](https://github.com/Ocdeed/json-schema-faker-lite/actions/workflows/build.yml/badge.svg)](https://github.com/Ocdeed/json-schema-faker-lite/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🌱 **Lightweight** - Zero runtime dependencies
- 🔒 **TypeScript-first** - Full type safety with strict mode
- 🎲 **Deterministic** - Seed support for reproducible data
- 🌐 **Universal** - Works in Node.js and browsers
- 📦 **Schema-compliant** - Supports common JSON Schema keywords
- 🎨 **Realistic data** - Generates meaningful fake data, not gibberish

## Installation

```bash
# npm
npm install json-schema-faker-lite

# yarn
yarn add json-schema-faker-lite

# pnpm
pnpm add json-schema-faker-lite
```

## Quick Start

```typescript
import { generate } from 'json-schema-faker-lite';

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer', minimum: 1 },
    name: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    isActive: { type: 'boolean' }
  },
  required: ['id', 'name', 'email']
};

const mockUser = generate(userSchema);
console.log(mockUser);
// Output: { id: 42, name: 'john', email: 'john@example.com', isActive: true }
```

## Usage Examples

### Basic Object

```typescript
const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'integer', minimum: 18, maximum: 100 }
  },
  required: ['name']
};

generate(schema);
// { name: 'Lorem ipsum', age: 25 }
```

### Arrays

```typescript
const usersSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' }
    }
  },
  minItems: 3,
  maxItems: 10
};

generate(usersSchema, { arrayLength: 5 });
// [{ id: 1, name: '...' }, { id: 2, name: '...' }, ...]
```

### Formats

```typescript
const contactSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    website: { type: 'string', format: 'url' },
    userId: { type: 'string', format: 'uuid' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

generate(contactSchema);
// { email: 'user@example.com', website: 'https://example.com', userId: '550e8400-...', createdAt: '2024-01-15T10:30:00.000Z' }
```

### Enums

```typescript
const statusSchema = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['pending', 'active', 'completed'] },
    priority: { type: 'integer', enum: [1, 2, 3] }
  }
};

generate(statusSchema);
// { status: 'active', priority: 2 }
```

### Deterministic Output (Seeding)

```typescript
// Same seed = same output
const result1 = generate(schema, { seed: 12345 });
const result2 = generate(schema, { seed: 12345 });

console.log(result1 === result2); // true (same seed)
// Or for string seeds:
generate(schema, { seed: 'my-seed-string' });
```

## API Reference

### generate(schema, options?)

Generates mock data from a JSON Schema.

**Parameters:**

- `schema` (JSONSchema) - The JSON Schema to generate from
- `options` (GenerateOptions, optional) - Generation options

**Returns:** `unknown` - Generated mock data

### generateArray(schema, count, options?)

Generates multiple mock data items.

**Parameters:**

- `schema` (JSONSchema) - The JSON Schema to generate from
- `count` (number) - Number of items to generate
- `options` (GenerateOptions, optional) - Generation options

**Returns:** `unknown[]` - Array of generated mock data

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `seed` | `number` | `undefined` | Seed for deterministic random generation |
| `maxDepth` | `number` | `10` | Maximum nesting depth for objects/arrays |
| `arrayLength` | `number` | `3` | Default number of items in arrays |
| `useDefaults` | `boolean` | `true` | Whether to use default values from schema |

## Supported Schema Features

### Types
- `string`
- `number`
- `integer`
- `boolean`
- `object`
- `array`
- `null`

### String Keywords
- `minLength` / `maxLength`
- `pattern` (regex)
- `format` (email, uuid, date-time, date, time, url, uri, hostname)
- `enum`
- `const`
- `default`

### Number/Integer Keywords
- `minimum` / `maximum`
- `exclusiveMinimum` / `exclusiveMaximum`
- `multipleOf`
- `enum`
- `const`
- `default`

### Object Keywords
- `properties`
- `required`
- `additionalProperties`
- `minProperties` / `maxProperties`
- `enum`
- `const`
- `default`

### Array Keywords
- `items`
- `minItems` / `maxItems`
- `uniqueItems`
- `enum`
- `const`
- `default`

## Limitations

- Pattern regex support is simplified (basic patterns supported)
- Not all JSON Schema formats are supported
- Complex nested schemas may hit maxDepth limit
- No support for `allOf`, `anyOf`, `oneOf`, `not` (v1.0)

## TypeScript

This package is written in TypeScript with strict mode enabled. All types are exported and included in the package.

```typescript
import { generate, JSONSchema } from 'json-schema-faker-lite';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' }
  }
};

const result = generate(schema);
```

## Browser Usage

```html
<script type="module">
  import { generate } from './dist/index.mjs';
  
  const result = generate({ type: 'string' });
  console.log(result);
</script>
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
