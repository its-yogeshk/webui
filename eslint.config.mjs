import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tailwind from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      tailwindcss: tailwind,
    },
    rules: {
      // Suggest canonical classes instead of arbitrary values
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "warn",
      "tailwindcss/enforces-shorthand": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;