module.exports = {
  preset: '@rnx-kit/jest-preset',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  globals: {
    __DEV__: true
  },
  transformIgnorePatterns: [
    'jest-runner'
  ],
  testMatch: ['<rootDir>/src/__tests__/*.[jt]s?(x)']
}
