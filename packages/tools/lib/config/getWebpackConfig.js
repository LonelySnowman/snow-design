const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackBarPlugin = require('webpackbar');
const HashedModuleIdsPlugin = webpack.ids.HashedModuleIdsPlugin;
const getBabelConfig = require('./getBabelConfig');

const rootPath = path.resolve(__dirname, '../../../../');

module.exports = function ({ root, minimize, mode = 'react' }) {
    let externals = {};
    switch (mode) {
        case "react":
            externals = {
                react: {
                    root: 'React',
                    commonjs2: 'react',
                    commonjs: 'react',
                    amd: 'react'
                },
                'react-dom': {
                    root: 'ReactDOM',
                    commonjs2: 'react-dom',
                    commonjs: 'react-dom',
                    amd: 'react-dom'
                }
            }
            break;
        case "vue":
            externals = {
                vue: {
                    root: 'Vue',
                    commonjs2: 'vue',
                    commonjs: 'vue',
                    amd: 'vue'
                }
            }
            break;
    }
    return {
        mode: 'production',
        bail: true,
        devtool: 'source-map',
        entry: {
            index: [path.resolve(root, './index.ts')]
        },
        output: {
            filename: minimize ? 'components.min.js' : 'components.js',
            path: path.resolve(root, './dist/umd'),
            library: 'SnowUI',
            libraryTarget: 'umd'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: getBabelConfig({ isESM: true, mode })
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                            }
                        }
                    ]
                },
                { test: /\.scss$/, use: 'null-loader' },
            ]
        },
        optimization: {
            minimize: !!minimize,
            minimizer: [new TerserPlugin()] // 代码压缩
        },
        performance: { maxEntrypointSize: 10485760, maxAssetSize: 5242880 },
        plugins: [
            new DefinePlugin({ // 定义全局变量
                'process.env': { NODE_ENV: '"production"', PUBLIC_URL: undefined }
            }),
            new CaseSensitivePathsPlugin(), // 检查文件引用路径
            new WebpackBarPlugin(), // 显示构建进度条
            new HashedModuleIdsPlugin() // 为模块指定唯一ID 利于缓存
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            alias: { // LJQFLAG 更换为解析 node_modules
                "@snow-design/foundation": path.resolve(rootPath, "./packages/foundation"),
                "@snow-design/components": path.resolve(rootPath, "./packages/components"),
                "@snow-design/locale": path.resolve(rootPath, "./packages/locale"),
            },
        },
        externals: externals // 声明外部依赖
    };
};
