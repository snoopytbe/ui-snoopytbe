import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
      "react-hooks": reactHooks,
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    rules: {
      // Règles historiques des hooks React (la "recommended" v5 inclut les
      // règles expérimentales du React Compiler, hors périmètre ici)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Pas d'`any` sans justification explicite via @ts-expect-error
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          minimumDescriptionLength: 10,
        },
      ],

      // Pas de console.log — uniquement warn/error
      "no-console": ["error", { allow: ["warn", "error"] }],

      // Jamais d'export default
      "import/no-default-export": "error",

      // Imports relatifs uniquement, jamais plus de 2 niveaux (../../.. interdit)
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../../*"],
              message: "Jamais plus de 2 niveaux d'imports relatifs (../../.. interdit).",
            },
          ],
        },
      ],

      // import type {} toujours séparé des imports de valeurs
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],

      // Ordre des imports : natif -> externe -> interne -> types
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", ["parent", "sibling", "index"], "type"],
          "newlines-between": "never",
        },
      ],

      // Fichiers < 300 lignes — au-delà, diviser en unités plus petites
      "max-lines": ["error", { max: 300, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}"],
    rules: {
      "max-lines": "off",
    },
  },
  {
    // Storybook exige `export default meta` (CSF) — incompatible avec no-default-export
    files: ["src/**/*.stories.{ts,tsx}"],
    rules: {
      "import/no-default-export": "off",
    },
  },
);
