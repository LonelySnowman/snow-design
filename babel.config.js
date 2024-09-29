module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
    ],
    overrides: [
        {
            test: ['./packages/vue3', './test/vue'],
            plugins: [['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }]]
        },
        {
            test: ['./packages/components', './test/react'],
            presets: ['@babel/preset-react']
        }
    ]
}
