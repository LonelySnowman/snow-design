const { compile } = require('./utils/compile.js')
const path = require('path')

const rootPath = path.join(__dirname, '../../../')
compile(
    rootPath,
    path.join(rootPath , 'packages/foundation'),
    path.join(rootPath , 'packages/foundation/_theme')
)
