const gulp = require('gulp');
require('./config/gulpfile');

function compileLib() {
    const taskInstance = gulp.task('compileLib');
    if (taskInstance === undefined) {
        console.error('no task named compileLib registered');
        return;
    }
    taskInstance.apply(gulp);
}

compileLib();