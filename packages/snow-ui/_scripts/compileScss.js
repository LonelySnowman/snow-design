import compile from './utils/compile.js'
import path from "path";

const rootPath = "../../../"
compile(
    rootPath,
    path.join(rootPath , 'packages/snow-foundation'),
    path.join(rootPath , 'packages/snow-foundation/_theme')
)
