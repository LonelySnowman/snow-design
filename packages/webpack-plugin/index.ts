import path from 'path';
import { Compiler } from 'webpack';
import { transformPath } from './utils';

export interface WebpackContext {
    NormalModule?: any
}

export interface ExtractCssOptions {
    loader: string;
    loaderOptions?: any
}
export interface SemiWebpackPluginOptions {
    theme?: string | SemiThemeOptions;
    prefixCls?: string;
    variables?: {[key: string]: string | number};
    include?: string;
    omitCss?: boolean;
    webpackContext?: WebpackContext;
    extractCssOptions?: ExtractCssOptions;
    overrideStylesheetLoaders?: (loaders: any[]) => any[]

}

export interface SemiThemeOptions {
    name?: string
}

export default class SemiWebpackPlugin {

    options: SemiWebpackPluginOptions;
    constructor(options: SemiWebpackPluginOptions) {
        this.options = options;
    }

    apply(compiler: Compiler) {

        // 获取 NormalModule 对象
        let NormalModule = this.options.webpackContext?.NormalModule;
        if (!NormalModule && 'webpack' in compiler) NormalModule = compiler.webpack.NormalModule;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        if (!NormalModule) NormalModule = require('webpack/lib/NormalModule');

        // compilation 事件
        compiler.hooks.compilation.tap('SemiPlugin', (compilation: any) => {
            if (this.options.theme || this.options.prefixCls || this.options.omitCss) {
                if (NormalModule.getCompilationHooks) {
                    NormalModule.getCompilationHooks(compilation).loader.tap('SemiPlugin', (context: any, module: any) => {
                        // 使用 将文件中的 css 替换为 scss 的 loader
                        if (this.options.omitCss) {
                            this.omitCss(module);
                            return;
                        }
                        // 加入自定义 loader 处理文件
                        this.customTheme(module);

                        // 作用未知
                        if (this.options.prefixCls) {
                            this.customPrefix(module, this.options.prefixCls);
                        }
                    });
                } else {
                    compilation.hooks.normalModuleLoader.tap('SemiPlugin', (context: any, module: any) => {
                        if (this.options.omitCss) {
                            this.omitCss(module);
                            return;
                        }
                        this.customTheme(module);
                        if (this.options.prefixCls) {
                            this.customPrefix(module, this.options.prefixCls);
                        }
                    });
                }
            }
        });
    }

    // 注释掉引用的 css
    omitCss(module: any) {
        // 转换一下路径
        const compatiblePath = transformPath(module.resource);
        // 如果引用了 components FLAG
        if (/@douyinfe\/semi-(ui|icons)\/lib\/.+\.js$/.test(compatiblePath)) {
            module.loaders = module.loaders || [];
            module.loaders.push({
                // 加入一个新的 loader
                loader: path.join(__dirname, 'semi-omit-css-loader')
            });
        }
    }


    customTheme(module: any) {

        // 将引用的 CSS 转化为 SCSS
        const compatiblePath = transformPath(module.resource);
        if (/@douyinfe\/semi-(ui|icons)\/lib\/.+\.js$/.test(compatiblePath)) {
            module.loaders = module.loaders || [];
            module.loaders.push({
                loader: path.join(__dirname, 'semi-source-suffix-loader')
            });
        }

        // 引用了 scss 进行 loader 处理
        if (/@douyinfe\/semi-(ui|icons|foundation)\/lib\/.+\.scss$/.test(compatiblePath)) {
            const scssLoader = require.resolve('sass-loader');
            const cssLoader = require.resolve('css-loader');
            const styleLoader = require.resolve('style-loader');
            const semiSemiLoaderOptions = typeof this.options.theme === 'object' ? this.options.theme : {
                name: this.options.theme
            };

            // 判断 loader 中是否有 semi-theme-loader
            // 没有 semi-theme-loader 进入
            if (!this.hasSemiThemeLoader(module.loaders)) {
                // 最后使用 style Loader 处理
                const lastLoader = this.options.extractCssOptions ? {
                    loader: this.options.extractCssOptions.loader,
                    options: this.options.extractCssOptions.loaderOptions || {}
                } : {
                    loader: styleLoader
                };

                const loaderList = [
                    lastLoader,
                    {
                        loader: cssLoader,
                        options: {
                            sourceMap: false,
                        }
                    }, {
                        loader: scssLoader
                    },
                    {
                        loader: path.join(__dirname, 'semi-theme-loader'),
                        options: {
                            ...semiSemiLoaderOptions,
                            prefixCls: this.options.prefixCls,
                            variables: this.convertMapToString(this.options.variables || {}),
                            include: this.options.include
                        }
                    }];
                // 改变该模块需要处理的 loader
                module.loaders = this.options.overrideStylesheetLoaders?.(loaderList) ?? loaderList;
            }
        }
    }

    customPrefix(module: any, prefix: string) {
        // 路径 \\ 转换为 /
        const compatiblePath = transformPath(module.resource);
        if (/@douyinfe\/semi-[^/]+\/.+env\.js$/.test(compatiblePath)) {
            module.loaders = module.loaders || [];
            module.loaders.push({
                loader: path.join(__dirname, 'semi-prefix-loader'),
                options: {
                    replacers: {
                        BASE_CLASS_PREFIX: prefix
                    }
                }
            });
        }
    }

    hasSemiThemeLoader(loaders: any[]) {
        return (loaders || []).some((loader) => /semi-theme-loader/.test(loader.loader));
    }

    convertMapToString(map: {[key: string]: string | number}): string {
        return Object.keys(map).reduce(function (prev, curr) {
            return prev + `${curr}: ${map[curr]};\n`;
        }, '');
    }
}

