const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const DefinePlugin = webpack.DefinePlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackBarPlugin = require('webpackbar');
const HashedModuleIdsPlugin = webpack.ids.HashedModuleIdsPlugin;
const getBabelConfig = require('./getBabelConfig');

const rootPath = path.resolve(__dirname, '../../../../');

module.exports = function ({ minimize }) {
    return {
        mode: 'production',
        bail: true,
        devtool: 'source-map',
        entry: {
            index: [path.resolve(__dirname, '../../index.ts')]
        },
        output: {
            filename: minimize ? 'components.min.js' : 'components.js',
            path: path.resolve(__dirname, '../../dist/umd'),
            library: 'SnowUI',
            libraryTarget: 'umd'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: [
                        path.resolve(rootPath, './packages/components'),
                        path.resolve(rootPath, './packages/foundation'),
                        path.resolve(rootPath, './packages/locale')
                    ],
                    use: [
                        {
                            loader: 'babel-loader',
                            options: getBabelConfig({ isESM: true })
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                happyPackMode: false,
                                appendTsSuffixTo: []
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
            alias: {
                "@snow-design/foundation": path.resolve(__dirname, "../../../foundation"),
                "@snow-design/components": path.resolve(__dirname, "../../../components"),
                "@snow-design/locale": path.resolve(__dirname, "../../../locale"),
            },
        },
        externals: { // 声明外部依赖
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
    };
};
