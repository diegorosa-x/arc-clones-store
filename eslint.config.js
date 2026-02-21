import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // 1) ignora coisas geradas
  {
    ignores: ["dist", "supabase/functions/**", "node_modules"],
  },

  // 2) Regras básicas (vale pra tudo, inclusive vite.config.ts)
  js.configs.recommended,

  // 3) Type-aware lint SOMENTE pro código do app
  ...tseslint.configs.recommendedTypeChecked.map((c) => ({
    ...c,
    files: ["src/**/*.{ts,tsx}"],
  })),

  // 4) Config TS/React pro APP (src)
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },

  // 5) Para arquivos de config (vite.config.ts etc), NÃO usar project
  {
    files: ["*.config.*", "vite.config.*", "eslint.config.*"],
    ...tseslint.configs.recommended[0], // lint TS sem type-check
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
];