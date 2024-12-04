import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import path from "path";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      // Restrict direct imports of models outside DAO files
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/models/*"],
              message: "Models should only be accessed through DAO classes.",
            },
          ],
        }
      ]
    },
  },
  {
    files: ["**/*.dao.ts"], // For DAO files only
    rules: {
      "no-restricted-imports": "off", // Disable restriction for DAO files
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];