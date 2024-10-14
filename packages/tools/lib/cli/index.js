#!/usr/bin/env node

'use strict';
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2), {
    alias: {
        mode: 'm',
    },
    default: {
        mode: 'react',
    },
});
require('../gulpfile');

const allowTask = ['compile', 'dist', 'build', 'cleanLib', 'cleanDist', 'compileFoundation'];
function runTask(toRun) {
    const taskInstance = gulp.task(toRun);
    process.env.MODE = argv.mode;
    if (taskInstance === undefined || !allowTask.includes(toRun)) {
        console.error(`Unknown task "${toRun}"!`);
        return;
    }
    taskInstance.apply(gulp);
}

runTask(argv._[1]);
