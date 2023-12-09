import loaderUtils from 'loader-utils';
import resolve from 'enhanced-resolve';

export default function snowThemeLoader(source: string) {
    const query = loaderUtils.getOptions(this);
    if (!query.name) return source

    const theme = query.name || '@snow-design/theme-default';

    // 全局 scss 变量
    const scssVarStr = `@import "~${theme}/scss/index.scss";\n`;
    // 全局 css 变量
    const cssVarStr = `@import "~${theme}/scss/global.scss";\n`;

    let fileStr = source;

    // 判断自定义主题中组件级变量是否存在
    const componentVariables: string | boolean = resolve.sync(this.context, `${theme}/scss/local.scss`);
    let localImport = '';

    // 需要加入主题则将原主题覆盖
    // 将覆盖 scss 插入原 scss 之后
    if (componentVariables || query.include) {
        fileStr = fileStr.replace(/(@import '.\/variables.scss';?|@import ".\/variables.scss";?)/g, '')
        localImport += '@import "./variables.scss";\n'
    }

    // 主题中的 组件级变量
    if (componentVariables) {
        localImport += `@import "~${theme}/scss/local.scss";\n`;
    }

    // 本地组件级变量配置
    if (query.include) {
        localImport += `@import "${query.include}";\n`;
    }

    // 暂不支持单个进行渲染
    // if (query.variables) {
    //     localImport += `${query.variables}\n`;
    // }


    // 插入 prefixCls 引用
    // 功能暂不支持
    // const prefixCls = query.prefixCls || 'snow';
    // const prefixClsStr = `$prefix: '${prefixCls}';\n`;

    // 如果是 base.scss 需要额外注入 global.scss (css 变量存储) 和全局 scss 变量
    // 其余注入全局 scss 变量及组件级 scss 变量
    const isBaseStyle = source.includes('snow-base');
    if (isBaseStyle) {
        return `${cssVarStr}${scssVarStr}${fileStr}`;
    } else {
        return `${localImport}${scssVarStr}${fileStr}`;
    }
}

