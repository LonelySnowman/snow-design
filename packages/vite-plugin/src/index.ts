import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { compileString, Logger } from 'sass';
import { Plugin, normalizePath, ResolvedConfig } from 'vite';
import resolve from 'enhanced-resolve';

export interface SnowVitePluginOptions {
    theme?: string;
    include?: string;
    prefixCls?: string;
    variables?: { [key: string]: string | number };
}

/**
 * 1. 解析 css 到对应 scss
 * 2. 替换 scss 内容
 * 3. 再构建成对应的 css
 */
export default function SnowDesignVitePlugin(options: SnowVitePluginOptions): Plugin {
    let config = {} as ResolvedConfig;
    return {
        name: 'snow-theme',
        enforce: 'post',
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },
        load(id: string): any {
            const filePath = normalizePath(id);
            if (options.include) options.include = normalizePath(options.include);
            const isCSSFile = /@snow-design\/(components|foundation|vue3)\/lib\/.+\.css$/.test(filePath);
            // 开始解析 CSS 文件，指向 SCSS 并使用新变量覆盖旧主题包变量使用 sass 重新编译
            if (isCSSFile && !filePath.includes('_base/base.css')) {
                const scssFilePath = filePath.replace(/\.css$/, '.scss');
                return compileString(loader(fs.readFileSync(scssFilePath), options, config), {
                    importers: [
                        {
                            findFileUrl(url) {
                                // 帮助 sass 解析 ~ 指向 node_modules
                                if (url.startsWith('~')) {
                                    return new URL(
                                        url.substring(1),
                                        pathToFileURL(scssFilePath.match(/^(\S*\/node_modules\/)/)[0]),
                                    );
                                }
                                const filePath = path.resolve(path.dirname(scssFilePath), url);
                                if (fs.existsSync(filePath)) {
                                    return pathToFileURL(filePath);
                                }
                                return null;
                            },
                        },
                    ],
                    logger: Logger.silent,
                }).css;
            }
        },
    };
}

function loader(source: Buffer, options: SnowVitePluginOptions, config: ResolvedConfig) {
    let fileStr = source.toString(); // 文件原本的内容
    fileStr = fileStr.replace(/(@import '.\/variables.scss';?|@import ".\/variables.scss";?)/g, '');

    const defaultTheme = '@snow-design/theme-default';
    const customTheme = options.theme;

    let SCSSVarStr = ''; // 更新优先级后的 SCSS 变量
    SCSSVarStr += '@import "./variables.scss";\n';

    // 自定义主题包
    if (customTheme) {
        const componentVariables: string | boolean = resolve.sync(config.root, `${customTheme}/scss/index.scss`);
        if (componentVariables) {
            SCSSVarStr += `@import "~${customTheme}/scss/index.scss";\n`;
        } else {
            SCSSVarStr += `@import "~${defaultTheme}/scss/index.scss";\n`;
            console.error(`[SnowDesign ERROR]: ${customTheme}/scss/index.scss not exist!`);
        }
    }

    // 本地组件级变量配置
    if (options.include) {
        SCSSVarStr += `@import "${options.include}";\n`;
    }

    // 配置式 SCSS 变量
    if (options.variables) {
        for (const [key, val] of Object.entries(options.variables)) {
            SCSSVarStr += `$${key}: ${val};\n`;
        }
    }

    // 自定义 CSS 类名前缀
    if (options.prefixCls) {
        SCSSVarStr += `$prefix: '${options.prefixCls}';`;
    }

    return `${SCSSVarStr}${fileStr}`;
}
