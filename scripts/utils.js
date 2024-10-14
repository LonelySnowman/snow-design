const fs = require('fs-extra');
const ejs = require('ejs');
const chalk = require('chalk');

function writeFile(data, templatePath, outputPath) {
    const template = fs.readFileSync(templatePath, 'utf8');
    const content = ejs.render(template, data);
    fs.outputFileSync(outputPath, content, 'utf8');
}

function logFile(name, path) {
    console.log(chalk.blueBright(name), path);
}

module.exports = {
    writeFile,
    logFile,
};
