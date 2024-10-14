module.exports = {
    '*.{ts,tsx,js,jsx,css,mjs,json}': ['eslint --fix'],
    '*.{md,yml}': ['prettier --ignore-unknown --write'],
    '*.{css,scss}': ['stylelint --fix'],
};
