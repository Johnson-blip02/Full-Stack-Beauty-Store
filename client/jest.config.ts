// jest.config.ts
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  testMatch: [
    "**/__tests__/**/*.(test|spec).ts?(x)",
    "**/?(*.)+(test|spec).ts?(x)",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.test.json", // Point to the new tsconfig
    },
  },
};
