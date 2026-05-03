// Security-focused ESLint config — runs alongside biome (which owns
// general lint + format). The two security plugins below catch
// patterns biome doesn't:
//
//   eslint-plugin-security      — detect-eval-with-expression,
//                                 detect-non-literal-fs-filename,
//                                 detect-object-injection, …
//   eslint-plugin-no-unsanitized — flag .innerHTML / document.write
//                                 / .insertAdjacentHTML with
//                                 untrusted input
//
// Scope: src/**/*.ts only. The TS parser is loaded explicitly so the
// recommended rules apply to TypeScript syntax without needing the
// full typescript-eslint preset.

import noUnsanitized from "eslint-plugin-no-unsanitized";
import securityPlugin from "eslint-plugin-security";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
    },
    plugins: {
      security: securityPlugin,
      "no-unsanitized": noUnsanitized,
    },
    rules: {
      ...securityPlugin.configs.recommended.rules,
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
    },
  },
];
