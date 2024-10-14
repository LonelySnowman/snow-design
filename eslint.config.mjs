import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    {
        ignores: [
            '**/node_modules/**',
            '**/lib/**',
            '**/dist/**',
            '**/.dumi/**',
            '**/*.md',
            '**/*.snap',
            '!packages/tools/lib/**',
        ],
    },
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    /** js 推荐配置 */
    eslint.configs.recommended,
    /** ts 推荐配置 */
    ...tseslint.configs.recommended,
    /** prettier 配置插件 */
    eslintPluginPrettierRecommended,
    /** react 推荐配置 */
    pluginReact.configs.flat.recommended,
    /** 自定义配置 */
    {
        files: ['**/*.{js,mjs,cjs,ts,tsx}'],
        rules: {
            '@typescript-eslint/no-require-imports': 'off',
            'no-case-declarations': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        files: ['packages/vue3/**/*.{ts,tsx}', 'test/vue/**/*.{ts,tsx}'],
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/no-unknown-property': 'off',
        },
    },
];
