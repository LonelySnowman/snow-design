/**
 * @description babel config for babel jest
 */
module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    overrides: [
        {
            test: ['./packages/vue3', './test/vue'],
            plugins: ['@vue/babel-plugin-jsx'],
        },
        {
            test: ['./packages/components', './test/react'],
            presets: ['@babel/preset-react'],
        },
    ],
};
