import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [
      "**/*.integration.test.ts",
      "**/node_modules/**",
    ],
    coverage: {
      provider: "v8",

      reporter: [
        "text",
        "html",
        "lcov",
      ],

      include: [
        "src/**/*.ts",
      ],

      exclude: [
        "src/**/*.test.ts",
        "src/**/*.integration.test.ts",
        "src/types/**",
        "src/server.ts",
      ],
      thresholds: {
        statements: 14,
        branches: 9,
        functions: 11,
        lines: 14,
      },
    },
  },
});