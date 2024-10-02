const fs = require('fs-extra');
const path = require('path');
const sass = require('sass');
const webpack = require('webpack');
const getWebpackConfig = require('./config/getWebpackConfig');

function compileStyle(packagePath, foundationPath, themePath, isMin = false) {
    const scssRaw = [];
    if (fs.existsSync(themePath + '/index.scss')) // 插入主题样式
        scssRaw.push('@import "~@snow-design/theme-default/scss/index.scss";')
    const styleFiles = fs.readdirSync(foundationPath); // 插入组件样式
    for (const fileName of styleFiles) {
        const filePath = path.join(foundationPath, fileName)
        if (fs.lstatSync(filePath).isDirectory() && !fileName.startsWith('_')) {
            const scssFiles = fs.readdirSync(filePath)
            if (scssFiles.includes(`${fileName}.scss`))
                scssRaw.push(`@import "~@snow-design/foundation/${fileName}/${fileName}.scss";`);
        }
    }
    const outPutScss = path.join(packagePath, `./dist/css/${isMin ? 'snow.min.scss' : 'snow.scss'}`)
    const outPutCss = path.join(packagePath, `./dist/css/${isMin ? 'snow.min.css' : 'snow.css'}`)
    const content = scssRaw.join('\n')
    fs.outputFileSync(outPutScss, content, 'utf-8');
    const result = sass.renderSync({ // 使用 sass 编译
        file: outPutScss,
        outputStyle: isMin ? 'compressed' : 'expanded',
        charset: false
    })
    fs.writeFileSync(outPutCss, result.css.toString(), 'utf-8');
}

function compileDist() {
    return new Promise((resolve, reject) => {
        webpack(getWebpackConfig({ minimize: false }), (err, stats) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                (info.errors || []).forEach(error => {
                    console.error(error);
                });
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function compileDistMin() {
    return new Promise((resolve, reject) => {
        webpack(getWebpackConfig({ minimize: true }), (err, stats) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                (info.errors || []).forEach(error => {
                    console.error(error);
                    reject(err);
                });
            }
            resolve();
        });
    });
}

module.exports = {
    compileDist,
    compileDistMin,
    compileStyle
}
