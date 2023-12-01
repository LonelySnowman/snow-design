import fs from 'fs-extra';
import path from 'path';
import * as sass from 'sass';

const compile = (rootPath, foundationPath, themePath, isMin = false) => {
    const scssRaw = []

    if (fs.existsSync(themePath + '/index.scss')) // 插入主题样式
        scssRaw.push('@import "../../../snow-foundation/_theme/index.scss";')

    const styleFiles = fs.readdirSync(foundationPath); // 插入组件样式
    for (const fileName of styleFiles) {
        const filePath = path.join(foundationPath, fileName)
        if (fs.lstatSync(filePath).isDirectory() && !fileName.startsWith('_')) {
            const scssFiles = fs.readdirSync(filePath)
            if (scssFiles.includes(`${fileName}.scss`))
                scssRaw.push(`@import "../../../snow-foundation/${fileName}/${fileName}.scss";`)
        }
    }

    const outPutScss = path.join(rootPath, `packages/snow-ui/dist/css/${isMin ? 'snow.min.scss' : 'snow.scss'}`)
    const outPutCss = path.join(rootPath, `packages/snow-ui/dist/css/${isMin ? 'snow.min.css' : 'snow.css'}`)
    const content = scssRaw.join('\n')
    fs.outputFileSync(outPutScss, content, 'utf-8')

    const result = sass.renderSync({ // 使用 sass 编译
        file: outPutScss,
        outputStyle: isMin ? 'compressed' : 'expanded',
        charset: false
    })
    fs.writeFileSync(outPutCss, result.css.toString(), 'utf-8');
};

export default compile
