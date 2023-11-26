const { compile } = require('@douyinfe/semi-scss-compile');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '../..', dir);
}


compile({
    foundationPath: resolve('semi-foundation/'),
    outputPath: resolve('semi-ui/dist/css/semi.min.css'),
    isMin: true
});

compile({
    foundationPath: resolve('semi-foundation/'),
    outputPath: resolve('semi-ui/dist/css/semi.css'),
    isMin: false
});


