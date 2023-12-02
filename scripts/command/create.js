const path = require('path');
const { toUpperCamelCase, writeFile, logFile} = require('../utils');
const ora = require('ora');
const chalk = require('chalk');

function create(name, pkgName) {
    const spinner = ora(`组件 ${name} 创建中...`)
    spinner.start()
    const rootPath = path.join(__dirname, '../../');
    const data = {
        cName: name,
        cNameUp: toUpperCamelCase(name),
        pkgName: pkgName
    };

    // 写入组件文件
    const [componentPath, componentOutputPath] = [path.join(rootPath, './scripts/templates/component.ejs'), path.join(rootPath, `./packages/components/${name}/index.tsx`)];
    writeFile(data, componentPath, componentOutputPath);

    // 写入 story 文件
    const [storyPath, storyOutputPath] = [path.join(rootPath, './scripts/templates/story.ejs'), path.join(rootPath, `./packages/components/${name}/_story/${name}.stories.tsx`)];
    writeFile(data, storyPath, storyOutputPath);

    // 写入测试文件
    const [testPath, testOutputPath] = [path.join(rootPath, './scripts/templates/test.ejs'), path.join(rootPath, `./packages/components/${name}/__test__/${name}.test.tsx`)];
    writeFile(data, testPath, testOutputPath)

    // 写入样式文件
    const [styleTemplatePath, styleOutputPath] = [path.join(rootPath, './scripts/templates/style.ejs'), path.join(rootPath, `./packages/foundation/${name}/${name}.scss`)];
    writeFile(data, styleTemplatePath, styleOutputPath);

    // 写入基础常量文件
    const [constTemplatePath, constOutputPath] = [path.join(rootPath, './scripts/templates/constants.ejs'), path.join(rootPath, `./packages/foundation/${name}/constants.ts`)];
    writeFile(data, constTemplatePath, constOutputPath);

    // 写入css变量文件
    const [varTemplatePath, varOutputPath] = [path.join(rootPath, './scripts/templates/variables.ejs'), path.join(rootPath, `./packages/foundation/${name}/variables.scss`)];
    writeFile(data, varTemplatePath, varOutputPath);

    // 写入文档文件
    const [docTemplatePath, docOutputPath] = [path.join(rootPath, './scripts/templates/doc.ejs'), path.join(rootPath, `./docs/docs/components/${name}.md`)];
    writeFile(data, docTemplatePath, docOutputPath);

    spinner.succeed(`组件 ${chalk.blueBright(name)} 创建成功`);
    logFile('component', componentOutputPath)
    logFile('story', storyOutputPath)
    logFile('test', testOutputPath);
    logFile('style', styleOutputPath);
    logFile('constants', constOutputPath);
    logFile('variables', varOutputPath);
}

module.exports = {
    create
}