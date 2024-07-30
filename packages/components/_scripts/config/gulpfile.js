const path = require('path');
const merge2 = require('merge2');
const gulp = require('gulp');
const gulpTS = require('gulp-typescript');
const gulpBabel = require('gulp-babel');
const tsConfig = require('../../tsconfig.json');
const replace = require('gulp-replace');
const del = require('del'); // 注意版本
const getBabelConfig = require('./getBabelConfig');
const sass = require('gulp-sass')(require('sass'));
const inject = require('gulp-inject-string')

gulp.task('cleanLib', function cleanLib() {
    return del(['lib/**/*']);
});

gulp.task('compileTSXForESM', function compileTSXForESM() {
    const tsStream = gulp.src(['**/*.tsx', '**/*.ts', '!**/node_modules/**/*.*', '!**/_story/**/*.*', '!**/__test__/**/*.*'])
        .pipe(gulpTS({
            ...tsConfig.compilerOptions,
            rootDir: path.join(__dirname, '../../../')
        }));
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
            rootDir: path.join(__dirname, '../../../')
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
    const rootPath = path.resolve(__dirname, '../../../../');
    return gulp.src(['**/*.scss', '!**/node_modules/**/*.*', '!**/_story/**/*.scss', '!**/dist/**/*.*'])
        .pipe(inject.prepend(`
        @import "${rootPath}/packages/theme-default/scss/index.scss";\n
        @import "${rootPath}/packages/theme-default/scss/global.scss";\n
        `.replaceAll('\\', '/')))
        .pipe(sass({
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

gulp.task('compileLib',
    gulp.series(
        [
            'cleanLib',
            'compileScss',
            gulp.parallel('moveScssForESM', 'moveScssForCJS'), // 将 scss 文件存入 lib 包 便于后续主题定制
            gulp.parallel('compileTSXForESM', 'compileTSXForCJS')
        ]
    )
);
