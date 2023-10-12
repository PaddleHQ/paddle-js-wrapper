/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.(ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
