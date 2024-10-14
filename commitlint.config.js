module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [2, 'always'],
        'subject-empty': [2, 'never'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'style',
                'docs',
                'test',
                'refactor',
                'chore',
                'revert',
                'workflow',
                'types',
                'release',
            ],
        ],
    },
};
