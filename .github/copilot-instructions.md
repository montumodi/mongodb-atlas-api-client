# MongoDB Atlas API Client - Copilot Instructions

## Project Overview

This is a MongoDB Atlas API client library for Node.js that provides a programmatic interface to the MongoDB Atlas REST API. The library uses HTTP Digest Authentication and wraps the urllib HTTP client library.

## Architecture and Code Organization

### Module Structure
- Each API resource (User, Cluster, Project, Organization, etc.) is implemented as a separate class in `src/`
- Each class follows a consistent pattern:
  - Constructor receives: `client`, `baseUrl`, and optionally `projectId`
  - Methods return promises
  - All API methods accept an optional `options` parameter
- The main entry point (`src/index.js`) exports a factory function that creates instances of all API resource classes
- TypeScript definitions (`.d.ts` files) are provided alongside each JavaScript file

### Key Components
- `httpClient.js`: HTTP client wrapper that handles digest authentication
- `helper.js`: Utility functions for query string generation
- `index.js`: Main entry point that instantiates and exports all API resource clients

## Code Patterns and Conventions

### API Method Pattern
```javascript
async methodName(param1, param2, options = {}) {
  const queryString = getQueryStringFromOptions(options);
  const httpOptions = options.httpOptions;
  const response = await this.client_.fetch(`${this.baseUrl_}/path/${param1}?${queryString}`, {
    "method": "METHOD",
    "data": body,
    ...httpOptions
  });
  return response;
}
```

### Class Pattern
- Private properties use trailing underscore: `this.client_`, `this.baseUrl_`, `this.projectId_`
- All methods are async and return promises
- Methods should handle `options` parameter for query strings and HTTP options
- The `httpOptions` parameter is extracted from options and passed separately (not included in query string)

### Naming Conventions
- Use camelCase for variables and function names
- Use PascalCase for class names
- Use descriptive names (e.g., `getAll`, `getById`, `delete`, `create`, `update`)
- Private instance variables end with underscore: `this.client_`, `this.baseUrl_`

## Testing Requirements

### Test Framework
- Uses `@hapi/lab` for test execution
- Uses `@hapi/code` for assertions
- Uses `sinon` for stubbing/mocking when needed
- Uses `urllib`'s MockAgent for HTTP mocking
- **100% code coverage is required** - all tests must pass with full coverage

### Test Structure Pattern
```javascript
const {describe, it, afterEach, before, beforeEach} = exports.lab = require("@hapi/lab").script();
const {expect} = require('@hapi/code');

describe("Mongo Atlas Api Client - ResourceName", () => {
  let mockAgent;
  let mockPool;
  
  before(() => {
    mockAgent = new MockAgent();
    setGlobalDispatcher(mockAgent);
  });

  beforeEach(() => {
    mockPool = mockAgent.get(baseUrl);
  });

  afterEach(() => {
    mockAgent.assertNoPendingInterceptors();
  });

  describe("When method is called", () => {
    it("should return expected result", async () => {
      mockPool.intercept({
        "path": `/expected/path`,
        "method": "get"
      }).reply(200, {"response": "data"});
      
      const result = await client.resource.method();
      expect(result).to.equal({"response": "data"});
    });
  });
});
```

### Test Guidelines
- Test file names match source files: `user.js` → `user.test.js`
- Each resource should have tests for:
  - Verification that methods are exported from index
  - Each public method with various parameter combinations
  - Query string handling
  - HTTP options handling
- Use MockAgent to intercept HTTP requests
- Always call `mockAgent.assertNoPendingInterceptors()` in afterEach

## Linting and Code Style

### ESLint Configuration
- Uses ESLint 9 with `@eslint/js` recommended config
- ES2015+ (latest) JavaScript syntax
- CommonJS module system (not ES modules)
- Strict rules including:
  - No console logs (`no-console: error`)
  - No var declarations (`no-var: error`)
  - Prefer const (`prefer-const: error`)
  - Prefer template literals (`prefer-template: error`)
  - Complexity limit of 9 (`complexity: [warn, 9]`)
  - One variable declaration per statement (`one-var: [warn, never]`)
  - Variable name length: 2-70 characters (with exceptions for i, j, k, n, Q, _)

### Code Style Guidelines
- Use double quotes for strings (no enforcement, but check existing code)
- Use semicolons at end of statements (no enforcement, but check existing code)
- No trailing commas in arrays/objects (`comma-dangle: [error, never]`)
- Use arrow functions for callbacks where appropriate
- Prefer object method shorthand

## Build and Development Commands

```bash
# Install dependencies
npm install

# Run tests (includes linting and depcheck)
npm test

# Run linting only
npm run lint

# Run dependency check
npm run depcheck

# Version bumping and publishing
npm run patch   # Bump patch version
npm run minor   # Bump minor version
npm run major   # Bump major version
```

### Pre-test Steps
The `pretest` script automatically runs:
1. Dependency check with `depcheck`
2. ESLint on all source and test files

## TypeScript Definitions

- All source files should have corresponding `.d.ts` TypeScript definition files
- Type definitions should match the JavaScript implementation
- Export types for all public classes and their methods
- Method signatures should include parameter types and return types

## Dependencies

### Production
- `urllib`: HTTP client library (version 4.x)

### Development
- `@hapi/lab`: Test runner
- `@hapi/code`: Assertion library
- `eslint`: Linting
- `depcheck`: Dependency checker
- `sinon`: Test stubbing/mocking

## MongoDB Atlas API Specifics

### Authentication
- Uses HTTP Digest Authentication
- Requires public key (username) and private key (password)
- Authentication is handled by HttpClient class

### Common Parameters
- `baseUrl`: MongoDB Atlas API base URL (e.g., `https://cloud.mongodb.com/api/atlas/v1.0`)
- `projectId`: MongoDB Atlas project/group ID
- `options`: Object that can contain:
  - Query parameters (e.g., `envelope`, `itemsPerPage`, `pretty`)
  - `httpOptions`: Additional options passed to urllib (e.g., `timeout`)

### URL Structure
- Groups and projects are synonymous in MongoDB Atlas API
- URLs typically follow pattern: `/groups/{projectId}/resource/{identifier}`

## Best Practices for Contributing

1. **Minimal Changes**: Make the smallest possible changes to accomplish the goal
2. **Test Coverage**: Maintain 100% test coverage - add tests for all new code
3. **Consistency**: Follow existing patterns in the codebase
4. **No Breaking Changes**: Don't modify existing public APIs unless necessary
5. **Documentation**: Update README.md if adding new features
6. **Type Safety**: Update corresponding `.d.ts` files when modifying JavaScript
7. **Error Handling**: Follow existing error handling patterns (let errors propagate)
8. **Async/Await**: Use async/await for all asynchronous operations (not callbacks or raw promises)

## Common Tasks

### Adding a New API Resource

1. Create `src/resourceName.js` with class following the established pattern
2. Create `src/resourceName.d.ts` with TypeScript definitions
3. Add resource to `src/index.js` initialization and exports
4. Create `test/resourceName.test.js` with comprehensive tests
5. Ensure 100% coverage and all tests pass
6. Update README.md if the resource is a significant new feature

### Adding a Method to Existing Resource

1. Add method to the class in `src/`
2. Update corresponding `.d.ts` file
3. Add comprehensive tests in `test/` file
4. Ensure 100% coverage maintained
5. Run linter and fix any issues

## Important Notes

- This library is production code used by many users - stability is critical
- All changes must pass existing tests without modification
- HTTP interactions are mocked in tests using urllib's MockAgent
- The library uses MongoDB Atlas API v1.0
- Digest authentication is required for all API calls
