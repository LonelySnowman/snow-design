module.exports = ({ isESM = false }) => {
    const mode = process.env.MODE;
    const modePresets = [];
    const modePlugins = [];
    switch (mode) {
        case 'vue':
            modePlugins.push(['@vue/babel-plugin-jsx', { mergeProps: false, enableObjectSlots: false }]);
            break;
    }
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: isESM ? false : 'commonjs',
                },
            ],
            ...modePresets,
        ],
        plugins: [...modePlugins],
    };
};
