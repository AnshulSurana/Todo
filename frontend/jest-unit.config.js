module.exports = {
  rootDir: ".",
  verbose: true,
  testEnvironment: "jsdom",
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.test.ts"],
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
  testMatch: ["<rootDir>/test/**/*.test.js", "<rootDir>/test/**/*.test.tsx", "<rootDir>/test/**/*.test.ts"],
  testPathIgnorePatterns: ["<rootDir>/test/setup.test.ts"],
  globals: {
    IS_DEVELOPMENT: true,
  },
  testURL: "https://localhost:8080",
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  }
};
