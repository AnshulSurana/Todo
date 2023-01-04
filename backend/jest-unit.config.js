export default {
  preset: 'ts-jest',
  rootDir: ".",
  verbose: true,
  testEnvironment: "node",
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branches: 40,
      lines: 40,
    },
  },
  reporters: [
    "default",
    [
      "<rootDir>/node_modules/jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./__tests__/reports/test-report.html",
        includeFailureMsg: true,
      },
    ],
  ],
  testMatch: ["<rootDir>/test/**/*.test.js"],
  globals: {
    IS_DEVELOPMENT: true,
  },
  testURL: "https://localhost:3000",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  }
};
