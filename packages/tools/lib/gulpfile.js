const path = require('path');
const merge2 = require('merge2');
const { rimraf } = require('rimraf')
const gulp = require('gulp');
const gulpTS = require('gulp-typescript');
const gulpBabel = require('gulp-babel');
const replace = require('gulp-replace');
const gulpSass = require('gulp-sass')(require('sass'));
const sass = require('sass');
const inject = require('gulp-inject-string');
const webpack = require('webpack');
const fs = require('fs-extra');

const packagePath = process.cwd();
const nodeModulesPath = path.resolve(packagePath, './node_modules');
const rootDir = path.resolve(__dirname, '../../../');
const tsConfig = require(path.resolve(packagePath, './tsconfig.json'));
const getBabelConfig = require('./config/getBabelConfig');
const getWebpackConfig = require("./config/getWebpackConfig");

gulp.task('cleanLib', function cleanLib() {
    const libPath = path.resolve(packagePath, 'lib');
    return rimraf([libPath]);
});

gulp.task('compileTSXForESM', function compileTSXForESM() {
    const tsStream = gulp.src(['**/*.tsx', '**/*.ts', '!**/node_modules/**/*.*', '!**/_story/**/*.*', '!**/__test__/**/*.*'])
        .pipe(gulpTS(tsConfig.compilerOptions));
    const jsStream = tsStream.js
        .pipe(gulpBabel(getBabelConfig({ isESM: true })))
        .pipe(replace(/(import\s+)['"]@snow-design\/foundation\/([^'"]+)['"]/g, '$1\'@snow-design/foundation/lib/es/$2\''))
        .pipe(replace(/(import\s+.+from\s+)['"]@snow-design\/foundation\/([^'"]+)['"]/g, '$1\'@snow-design/foundation/lib/es/$2\''))
        .pipe(replace(/(import\s+)['"]@snow-design\/locale\/([^'"]+)['"]/g, '$1\'@snow-design/locale/lib/es/$2\''))
        .pipe(replace(/(import\s+.+from\s+)['"]@snow-design\/locale\/([^'"]+)['"]/g, '$1\'@snow-design/locale/lib/es/$2\''))
        .pipe(replace(/(import\s+)['"]([^'"]+)(\.scss)['"]/g, '$1\'$2.css\''))
        .pipe(gulp.dest('lib/es'));
    const dtsStream = tsStream.dts
        .pipe(replace(/(import\s+)['"]([^'"]+)(\.scss)['"]/g, '$1\'$2.css\''))
        .pipe(gulp.dest('lib/es'));
    return merge2([jsStream, dtsStream]);
});

gulp.task('compileTSXForCJS', function compileTSXForCJS() {
    const tsStream = gulp.src(['**/*.tsx', '**/*.ts', '!**/node_modules/**/*.*', '!**/_story/**/*.*', '!**/__test__/**/*.*'])
        .pipe(gulpTS({
            ...tsConfig.compilerOptions,
            rootDir
        }));
    const jsStream = tsStream.js
        .pipe(gulpBabel(getBabelConfig({ isESM: false })))
        .pipe(replace(/(require\(['"])@snow-design\/foundation\/([^'"]+)(['"]\))/g, '$1@snow-design/foundation/lib/cjs/$2$3'))
        .pipe(replace(/(require\(['"])@snow-design\/locale\/([^'"]+)(['"]\))/g, '$1@snow-design/locale/lib/cjs/$2$3'))
        .pipe(replace(/(require\(['"])([^'"]+)(\.scss)(['"]\))/g, '$1$2.css$4'))
        .pipe(gulp.dest('lib/cjs'));
    const dtsStream = tsStream.dts
        .pipe(replace(/(import\s+)['"]([^'"]+)(\.scss)['"]/g, '$1\'$2.css\''))
        .pipe(gulp.dest('lib/cjs'));
    return merge2([jsStream, dtsStream]);
});

gulp.task('compileScss', function compileScss() {
    const rootPath = path.resolve(__dirname, '../../../');
    return gulp.src(['**/*.scss', '!**/node_modules/**/*.*', '!**/_story/**/*.scss', '!**/dist/**/*.*'])
        .pipe(inject.prepend(`
        @import "${rootPath}/packages/theme-default/scss/index.scss";\n
        @import "${rootPath}/packages/theme-default/scss/global.scss";\n
        `.replaceAll('\\', '/')))
        .pipe(gulpSass({
            charset: false
        }).on('error', sass.logError))
        .pipe(gulp.dest('lib/es'))
        .pipe(gulp.dest('lib/cjs'));
});

function moveScss(isESM) {
    const moduleTarget = isESM ? 'es' : 'cjs';
    const targetDir = isESM ? 'lib/es' : 'lib/cjs';
    return gulp.src(['**/*.scss', '!**/node_modules/**/*.*', '!**/_story/**/*.scss'])
        .pipe(replace(/(@import\s+['"]~)(@douyinfe\/semi-foundation\/)/g, `$1@douyinfe/semi-foundation/lib/${moduleTarget}/`))
        .pipe(gulp.dest(targetDir));
}

gulp.task('moveScssForESM', function moveScssForESM() {
    return moveScss(true);
});

gulp.task('moveScssForCJS', function moveScssForCJS() {
    return moveScss(false);
});

gulp.task('compile',
    gulp.series(
        [
            'cleanLib',
            'compileScss',
            gulp.parallel('moveScssForESM', 'moveScssForCJS'), // 将 scss 文件存入 lib 包 便于后续主题定制
            gulp.parallel('compileTSXForESM', 'compileTSXForCJS')
        ]
    )
);

function compileStyle(isMin = false) {
    const scssRaw = [];
    const foundationPath = path.resolve(packagePath, './node_modules/@snow-design/foundation');
    const themePath = path.resolve(packagePath, './node_modules/@snow-design/theme-default/scss/index.scss');
    const outPutDir = path.resolve(packagePath, './dist/css');
    const outPutScss = path.resolve(packagePath, `./dist/css/${isMin ? 'snow.min.scss' : 'snow.scss'}`);
    const outPutCss = path.resolve(packagePath, `./dist/css/${isMin ? 'snow.min.css' : 'snow.css'}`);

    if (fs.existsSync(themePath)) // 插入主题样式
        scssRaw.push(`@import "${path.relative(outPutDir, themePath)}";`.replaceAll('\\', '/'))
    const styleFiles = fs.readdirSync(foundationPath); // 插入组件样式
    for (const fileName of styleFiles) {
        const filePath = path.join(foundationPath, fileName)
        if (fs.lstatSync(filePath).isDirectory() && !fileName.startsWith('_')) {
            const scssFiles = fs.readdirSync(filePath);
            const targetScss = path.resolve(foundationPath, `./${fileName}/${fileName}.scss`);
            if (scssFiles.includes(`${fileName}.scss`))
                scssRaw.push(`@import "${path.relative(outPutDir, targetScss)}";`.replaceAll('\\', '/'));
        }
    }
    const content = scssRaw.join('\n')
    fs.outputFileSync(outPutScss, content, 'utf-8');
    const result = sass.renderSync({ // 使用 sass 编译
        file: outPutScss,
        outputStyle: isMin ? 'compressed' : 'expanded',
        charset: false
    })
    fs.writeFileSync(outPutCss, result.css.toString(), 'utf-8');
}

gulp.task('compileStyle', function () {
    return compileStyle();
});

function compileDist() {
    return new Promise((resolve, reject) => {
        webpack(getWebpackConfig({ root: packagePath, minimize: false }), (err, stats) => {
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
        webpack(getWebpackConfig({ root: packagePath, minimize: true }), (err, stats) => {
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

gulp.task('compileDist', async function () {
    await compileDist();
    await compileDistMin();
});


gulp.task('dist', gulp.parallel('compileStyle', 'compileDist'));
