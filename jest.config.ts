export default {
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/src/__tests__/utils"],
  collectCoverageFrom: ["src/**/*.{ts,js,tsx}"],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
}
