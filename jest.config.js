// jest.config.js
module.exports = {
    preset: 'ts-jest', // Use ts-jest preset for TypeScript support
    testEnvironment: 'node', // Set the test environment to Node.js
    testMatch: ['**/*.test.ts'], // Match all .test.ts files in any directory
    moduleFileExtensions: ['ts', 'js'], // Recognize both TypeScript and JavaScript files
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1', // Adjust this if you use path aliases
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json', // Ensure ts-jest uses your tsconfig.json
      },
    },
  };