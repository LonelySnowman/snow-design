import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { compileString, Logger } from "sass";
import { Plugin, normalizePath } from "vite";
import resolve from "enhanced-resolve";

export interface SnowVitePluginOptions {
    theme?: string;
    include?: string;

    // 配置支持待更新
    // prefixCls?: string;
    // variables?: {[key: string]: string | number};
}

/**
 * 1. 解析 css 到对应 scss
 * 2. 替换 scss 内容
 * 3. 再构建成对应的 css
 */
export default function SnowDesignVitePlugin(options: SnowVitePluginOptions): Plugin {
    let config = {}
    return {
        name: "snow-theme",
        enforce: "post",
        configResolved(resolvedConfig) {
            // 存储最终解析的配置
            config = resolvedConfig
        },
        load(id: string): any{
            let filePath = normalizePath(id);
            if (options.include) options.include = normalizePath(options.include);

            if (/@snow-design\/(components|foundation)\/lib\/.+\.css$/.test(filePath)) {
                let scssFilePath = filePath.replace(/\.css$/, ".scss");
                return compileString(
                    loader(fs.readFileSync(scssFilePath), options, config),
                    {
                        importers: [
                            {
                                findFileUrl(url) {
                                    if (url.startsWith("~")) {
                                        return new URL(
                                            url.substring(1),
                                            pathToFileURL(
                                                scssFilePath.match(/^(\S*\/node_modules\/)/)[0]
                                            )
                                        );
                                    }
                                    let filePath = path.resolve(path.dirname(scssFilePath), url);
                                    if (fs.existsSync(filePath)) {
                                        return pathToFileURL(filePath);
                                    }
                                    return null;
                                },
                            },
                        ],
                        logger: Logger.silent,
                    }
                ).css;
            }
        },
    };
};

function loader(source: Buffer, options: SnowVitePluginOptions, config: any) {
    let fileStr = source.toString();
    if (!options.theme) return fileStr

    const theme = options.theme;
    const scssVarStr = `@import "~${theme}/scss/index.scss";\n`;
    const cssVarStr = `@import "~${theme}/scss/global.scss";\n`;

    // 判断自定义主题中组件级变量是否存在
    const componentVariables: string | boolean = resolve.sync(config.root, `${theme}/scss/local.scss`);
    let localImport = '';

    // 需要加入主题则将原主题覆盖
    // 将覆盖 scss 插入原 scss 之后
    if (componentVariables || options.include) {
        fileStr = fileStr.replace(/(@import '.\/variables.scss';?|@import ".\/variables.scss";?)/g, '')
        localImport += '@import "./variables.scss";\n'
    }

    // 主题中的 组件级变量
    if (componentVariables) {
        localImport += `@import "~${theme}/scss/local.scss";\n`;
    }

    // 本地组件级变量配置
    if (options.include) {
        localImport += `@import "${options.include}";\n`;
    }

    const isBaseStyle = fileStr.includes('snow-base');
    if (isBaseStyle) {
        return `${cssVarStr}${scssVarStr}${fileStr}`;
    } else {
        return `${localImport}${scssVarStr}${fileStr}`;
    }
}
