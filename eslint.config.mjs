import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginNext from "@next/eslint-plugin-next";
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		plugins: { js },
		extends: ["js/recommended"],
	},
	{
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: { globals: globals.browser },
	},
	{ languageOptions: { globals: globals.jest } },
	tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat["jsx-runtime"],
	{
		plugins: {
			"@next/next": pluginNext,
		},
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		rules: {
			...pluginNext.configs.recommended.rules,
			...pluginNext.configs["core-web-vitals"].rules,
		},
	},
	{
		plugins: {
			js,
		},
		rules: {
			"no-empty-pattern": "warn",
		},
	},
	{
		plugins: {
			"react-hooks": reactHooks,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
		},
	},
	{
		rules: {
			"@typescript-eslint/no-empty-object-type": "warn",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{ argsIgnorePattern: "^_" },
			],
			"react/no-unescaped-entities": "warn",
		},
	},
	eslintConfigPrettier,
]);
