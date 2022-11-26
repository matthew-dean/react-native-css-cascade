module.exports = {
  preset: '@rnx-kit/jest-preset',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  transformIgnorePatterns: [
    'node_modules/(.pnpm)?/(?!react-native|@react-native)'
  ],
  testMatch: ['<rootDir>/src/__tests__/*.[jt]s?(x)']
}