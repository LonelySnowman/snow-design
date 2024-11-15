import path from 'path';
import { Compiler, NormalModule } from 'webpack';
import { transformPath } from './utils';

export interface SnowWebpackPluginOptions {
    theme?: string;
    include?: string;
    prefixCls?: string;
    variables?: { [key: string]: string | number };
}

export default class SnowWebpackPlugin {
    options: SnowWebpackPluginOptions;
    constructor(options: SnowWebpackPluginOptions) {
        this.options = options;
    }

    apply(compiler: Compiler) {
        // compilation 事件
        compiler.hooks.compilation.tap('SnowPlugin', (compilation: any) => {
            if (this.options.theme) {
                // module.resource 处理文件的名称
                NormalModule.getCompilationHooks(compilation).loader.tap(
                    'SnowThemeLoaderPlugin',
                    (context: any, module: any) => {
                        // 加入自定义 loader 处理文件
                        this.customTheme(module);
                    },
                );
            }
        });
    }

    // 判断是否已经注入 loader
    hasThemeLoader(loaders: any[]) {
        return (loaders || []).some((loader) => /snow-theme-loader/.test(loader.loader));
    }

    customTheme(module: any) {
        // 将 @snow-design/components 文件中引用的 CSS 转化为 SCSS
        // 使用自定义 loader 替换
        const compatiblePath = transformPath(module.resource);
        if (/@snow-design\/components\/lib\/.+\.js$/.test(compatiblePath)) {
            module.loaders = module.loaders || [];
            module.loaders.push({
                loader: path.join(__dirname, 'snow-source-suffix-loader'),
            });
        }

        // 使用 自定义loader 进行主题引入 并使用 sass-loader css-loader style-loader 重新引入
        if (/@snow-design\/(foundation|components)\/lib\/.+\.scss$/.test(compatiblePath)) {
            const scssLoader = require.resolve('sass-loader');
            const cssLoader = require.resolve('css-loader');
            const styleLoader = require.resolve('style-loader');

            // 没有加入自定义 loader 处理则进行处理
            if (!this.hasThemeLoader(module.loaders)) {
                // 改变该模块需要处理的 loader
                module.loaders = [
                    { loader: styleLoader },
                    {
                        loader: cssLoader,
                        options: {
                            sourceMap: false,
                        },
                    },
                    { loader: scssLoader },
                    {
                        loader: path.join(__dirname, 'snow-theme-loader'),
                        options: this.options,
                    },
                ];
            }
        }
    }
}
