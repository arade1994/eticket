import eslintConfigPrettier from "eslint-config-prettier";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import reactHooks from "eslint-plugin-react-hooks";
import eslintSimpleImportSort from "eslint-plugin-simple-import-sort";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import globals from "globals";

import { FlatCompat } from "@eslint/eslintrc";
import eslintJs from "@eslint/js";
import nextEslintPlugin from "@next/eslint-plugin-next";
import tsParser from "@typescript-eslint/parser";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  eslintJs.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@next/next": nextEslintPlugin,
      "no-relative-import-paths": noRelativeImportPaths,
      "react-hooks": reactHooks,
      "eslint-plugin-simple-import-sort": eslintSimpleImportSort,
    },
  },
  {
    ignores: [
      ".next/**/*",
      ".lintstagedrc.cjs",
      "public/**/*",
      ".prettierrc.js",
      "next.config.js",
      "ts-coverage",
      "coverage",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx"],
    ...testingLibraryPlugin.configs["flat/react"],
  },
  { languageOptions: { globals: { ...(globals.jest / globals) } } },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: true,
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      "react/jsx-uses-react": "error",
      "react/jsx-no-useless-fragment": [
        "error",
        {
          allowExpressions: true,
        },
      ],
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      "array-callback-return": "warn",
      complexity: ["warn", 15],
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/no-autofocus": "warn",
      "no-console": "warn",
      "no-debugger": "error",
      "no-duplicate-imports": 0,
      "no-nested-ternary": "warn",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: true,
          rootDir: "src",
        },
      ],
      "no-unneeded-ternary": "warn",
      "eslint-plugin-simple-import-sort/imports": [
        "error",
        {
          groups: [
            // `react` first, `next` second, then packages starting with a character
            ["^react$", "^next", "^[a-z]"],
            // Packages starting with `@`
            ["^@"],
            // Packages starting with `~`
            ["^~"],
            // Imports starting with `../`
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Imports starting with `./`
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports
            ["^.+\\.s?css$"],
            // Side effect imports
            ["^\\u0000"],
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
