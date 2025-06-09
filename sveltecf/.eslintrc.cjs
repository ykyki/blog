module.exports = {
    root: true,
    extends: ['eslint:recommended'],
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    ignorePatterns: ['*.svelte'],
    rules: {
        'no-restricted-imports': [
            'error',
            {
                patterns: [
                    {
                        group: ['./**', '**..', '!./$**'],
                        message: 'Relative imports are not allowed.',
                    },
                ],
            },
        ],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        {
            files: ['*.d.ts'],
            rules: {
                'no-unused-vars': 'off',
                'no-undef': 'off',
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ],
};
