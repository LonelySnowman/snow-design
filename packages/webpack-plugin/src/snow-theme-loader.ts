import loaderUtils from 'loader-utils';
import resolve from 'enhanced-resolve';

export default function snowThemeLoader(source: string) {
    const options = loaderUtils.getOptions(this);
    const defaultTheme = '@snow-design/theme-default';
    const customTheme = options.theme;

    if (this.resourcePath.includes('_base/base.scss')) {
        if (customTheme) {
            const cssVariables: string | boolean = resolve.sync(this.context, `${customTheme}/scss/global.scss`);
            if (cssVariables) {
                return `@import "~${customTheme}/scss/global.scss";\n`;
            } else {
                console.error(`[SnowDesign ERROR]: ${customTheme}/scss/global.scss not exist!`);
                return `@import "~${defaultTheme}/scss/global.scss";\n`;
            }
        } else {
            return `@import "~${defaultTheme}/scss/global.scss";\n`;
        }
    }

    let fileStr = source; // 文件原本的内容
    fileStr = fileStr.replace(/(@import ['"]\.\/variables.*?['"];?)/g, '');

    let SCSSVarStr = ''; // 更新优先级后的 SCSS 变量
    SCSSVarStr += '@import "./variables.scss";\n';

    // 自定义主题包
    if (customTheme) {
        const componentVariables: string | boolean = resolve.sync(this.context, `${customTheme}/scss/index.scss`);
        if (componentVariables) {
            SCSSVarStr += `@import "~${customTheme}/scss/index.scss";\n`;
        } else {
            SCSSVarStr += `@import "~${defaultTheme}/scss/index.scss";\n`;
            console.error(`[SnowDesign ERROR]: ${customTheme}/scss/index.scss not exist!`);
        }
    } else {
        SCSSVarStr += `@import "~${defaultTheme}/scss/index.scss";\n`;
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
