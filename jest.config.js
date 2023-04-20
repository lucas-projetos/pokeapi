module.exports = {
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "<rootDir>/__mocks__/styles.js",
  },
  testEnvironment: "jsdom",
};
