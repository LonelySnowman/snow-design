const gulp = require('gulp');
const merge2 = require('merge2');
const gulpTS = require('gulp-typescript');
const gulpBabel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');
const inject = require('gulp-inject-string')
const tsConfig = require('../../tsconfig.json');
const getBabelConfig = require('./getBabelConfig');

gulp.task('cleanLib', function cleanLib() {
    return del(['lib/**/*']);
});

function compileTS(isESM) {
    const targetDir = isESM ? 'lib/es' : 'lib/cjs';
    const tsStream = gulp.src(['**/*.ts', '!node_modules/**/*.*'])
        .pipe(gulpTS(tsConfig.compilerOptions));
    const jsStream = tsStream.js
        .pipe(gulpBabel(getBabelConfig({ isESM })))
        .pipe(gulp.dest(targetDir));
    const dtsStream = tsStream.dts.pipe(gulp.dest(targetDir));
    return merge2([jsStream, dtsStream]);
}

gulp.task('compileTSForESM', function compileTSForESM() {
    return compileTS(true);
});

gulp.task('compileTSForCJS', function compileTSForCJS() {
    return compileTS(false);
});

const excludeScss = [
    '!node_modules/**/*.*',
    '!**/rtl.scss',
    '!**/variables.scss',
    '!**/animation.scss',
]

// 编译 SCSS 全局注入默认主题样式
gulp.task('compileScss', function compileScss() {
    return gulp.src(['**/*.scss', ...excludeScss])
        .pipe(inject.prepend(`@import "../../theme-default/scss/index.scss";\n`))
        .pipe(sass({
            charset: false
        }).on('error', sass.logError))
        .pipe(gulp.dest('lib/es'))
        .pipe(gulp.dest('lib/cjs'));
});

// 将 SCSS 移动至 Lib 包
gulp.task('moveScss', function moveScss() {
    return gulp.src(['**/*.scss', '!node_modules/**/*.*'])
        .pipe(gulp.dest('lib/es'))
        .pipe(gulp.dest('lib/cjs'));
});

gulp.task('compileLib',
    gulp.series(
        [
            'cleanLib',
            'compileScss',
            'moveScss',
            gulp.parallel('compileTSForESM', 'compileTSForCJS'),
        ]
    )
);
