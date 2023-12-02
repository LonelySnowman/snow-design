const fs = require('fs-extra');
const ejs = require('ejs');
const chalk = require('chalk')

function toUpperCamelCase(str) {
    const words = str.split(/[\s_-]+/);
    const upperCamelCaseWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    const upperCamelCaseStr = upperCamelCaseWords.join('');
    return upperCamelCaseStr;
}

function writeFile(data, templatePath, outputPath) {
    const template = fs.readFileSync(templatePath, 'utf8');
    const content = ejs.render(template, data);
    fs.outputFileSync(outputPath, content, 'utf8');
}

function logFile(name, path) {
    console.log(chalk.blueBright(name), path)
}

module.exports = {
    toUpperCamelCase,
    writeFile,
    logFile
}
