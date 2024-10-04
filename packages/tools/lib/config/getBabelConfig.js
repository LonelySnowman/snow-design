module.exports = ({ isESM = false }) => {
    const mode = process.env.MODE;
    const modePresets = [];
    const modePlugins = [];
    switch (mode) {
        case 'vue':
            modePresets.push('@vue/babel-preset-jsx');
            modePlugins.push('@vue/babel-plugin-jsx');
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
            ...modePresets
        ],
        plugins: [...modePlugins]
    };
};
