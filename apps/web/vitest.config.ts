import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin(),
    tsconfigPaths(),
  ],

  test: {
    environment: "jsdom",
    setupFiles: [
      "./vitest.setup.ts",
    ],
    coverage: {
      provider: "v8",

      reporter: [
        "text",
        "html",
        "lcov",
      ],

      include: [
        "features/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
      ],

      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.stories.{ts,tsx}",
      ],
      thresholds: {
        statements: 1,
        branches: 3,
        functions: 3,
        lines: 1,
      },
    },
  },
});