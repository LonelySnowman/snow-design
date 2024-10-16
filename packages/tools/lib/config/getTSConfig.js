const { tsConfig, rootDir } = require('../common');

module.exports = () => {
    const gulpTSConfig = process.env.DECLARATION
        ? {
              ...tsConfig.compilerOptions,
              rootDir,
              declaration: true,
          }
        : {
              ...tsConfig.compilerOptions,
              rootDir,
          };
    return gulpTSConfig;
};
