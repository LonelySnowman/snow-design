const path = require("path");
const packagePath = process.cwd();
const nodeModulesPath = path.resolve(packagePath, './node_modules');
const rootDir = path.resolve(__dirname, '../../../');
const tsConfig = require(path.resolve(packagePath, './tsconfig.json'));

module.exports = {
    packagePath,
    nodeModulesPath,
    rootDir,
    tsConfig
}
