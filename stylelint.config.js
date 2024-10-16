module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recommended-scss', 'stylelint-config-recess-order'],
    overrides: [
        {
            files: ['**/*.(scss|css)'],
            customSyntax: 'postcss-scss',
        },
    ],
    ignoreFiles: ['**/*.{js,jsx,tsx,ts,json,md,yaml}'],
    rules: {
        'property-no-unknown': null,
        'selector-class-pattern': null,
        'property-no-vendor-prefix': null,
        'color-hex-length': null,
        'import-notation': null,
        'block-no-empty': null, // @todo: 优化 _base 中需要的占位符
    },
};
