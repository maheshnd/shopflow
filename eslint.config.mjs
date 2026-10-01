import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/storybook-static/**",
      "**/coverage/**",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  // Backend + shared contracts
  {
    files: [
      "apps/api/**/*.ts",
      "packages/contracts/**/*.ts",
    ],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Shared React UI
  {
    files: [
      "packages/ui/**/*.{ts,tsx}",
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      "react-hooks": reactHooks,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
];