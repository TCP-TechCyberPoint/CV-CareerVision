import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import * as tseslint from "typescript-eslint/eslint-config";
import parser from "@typescript-eslint/parser";

const cleanedGlobals = {
  ...globals.browser,
  ...globals.node,
};


export default [
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist"],
    languageOptions: {
      parser,
      ecmaVersion: 2020,
      sourceType: "module",
      globals: cleanedGlobals,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];