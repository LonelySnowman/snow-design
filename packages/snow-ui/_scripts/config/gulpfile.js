const path = require('path');
const merge2 = require('merge2');
const gulp = require('gulp');
const gulpTS = require('gulp-typescript');
const gulpBabel = require('gulp-babel');
const tsConfig = require('../../tsconfig.json');
const replace = require('gulp-replace');
const del = require('del'); // 注意版本
const getBabelConfig = require('./getBabelConfig');

gulp.task('cleanLib', function cleanLib() {
    return del(['lib/**/*']);
});

gulp.task('compileTSXForESM', function compileTSXForESM() {
    const tsStream = gulp.src(['**/*.tsx', '**/*.ts', '!**/node_modules/**/*.*', '!**/_story/**/*.*'])
        .pipe(gulpTS(tsConfig.compilerOptions));
    const jsStream = tsStream.js
        .pipe(gulpBabel(getBabelConfig({ isESM: true })))
        .pipe(replace(/(import\s+)['"]@snow-design\/snow-foundation\/([^'"]+)['"]/g, '$1\'@snow-design/snow-foundation/lib/es/$2\''))
        .pipe(replace(/(import\s+)['"]([^'"]+)(\.scss)['"]/g, '$1\'$2.css\''))
        .pipe(gulp.dest('lib/es'));
    const dtsStream = tsStream.dts
        .pipe(replace(/(import\s+)['"]([^'"]+)(\.scss)['"]/g, '$1\'$2.css\''))
        .pipe(gulp.dest('lib/es'));
    return merge2([jsStream, dtsStream]);
});

gulp.task('compileTSXForCJS', function compileTSXForCJS() {
    const tsStream = gulp.src(['**/*.tsx', '**/*.ts', '!**/node_modules/**/*.*', '!**/_story/**/*.*'])
        .pipe(gulpTS({
            ...tsConfig.compilerOptions,
            rootDir: path.join(__dirname, '..')
        }));
    const jsStream = tsStream.js
        .pipe(gulpBabel(getBabelConfig({ isESM: false })))
        .pipe(replace(/(require\(['"])@snow-design\/snow-foundation\/([^'"]+)(['"]\))/g, '$1@snow-design/snow-foundation/lib/cjs/$2$3'))
        .pipe(replace(/(require\(['"])([^'"]+)(\.scss)(['"]\))/g, '$1$2.css$4'))
        .pipe(gulp.dest('lib/cjs'));
    const dtsStream = tsStream.dts
        .pipe(replace(/(import\s+)['"]([^'"]+)(\.scss)['"]/g, '$1\'$2.css\''))
        .pipe(gulp.dest('lib/cjs'));
    return merge2([jsStream, dtsStream]);
});

gulp.task('compileLib',
    gulp.series(
        [
            'cleanLib',
            gulp.parallel('compileTSXForESM', 'compileTSXForCJS')
        ]
    )
);
