module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/*',
    '!<rootDir>/src/domain/usecases/index.usecases.domain.ts',
    '!<rootDir>/src/domain/models/index.models.domain.ts',
    '!<rootDir>/src/presentation/components/index.components.tsx',
    '!<rootDir>/src/presentation/pages/index.pages.tsx',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/main/test/cypress',
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
};
