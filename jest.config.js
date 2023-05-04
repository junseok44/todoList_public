module.exports = {
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/__tests__/**/*.+(spec|test).+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  verbose: true,
  testEnvironment: "jsdom",
  // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: "https://localhost:3000/index.html",
  },
  unmockedModulePathPatterns: ["node_modules/react/"],
  // moduleFileExtensions: ["js", "jsx", "json", "es6"],
};
