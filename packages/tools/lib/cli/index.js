#!/usr/bin/env node

'use strict';
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
require('../gulpfile');

function runTask(toRun) {
    const taskInstance = gulp.task(toRun);
    if (taskInstance === undefined) {
        return;
    }
    taskInstance.apply(gulp);
}

runTask(argv._[1]);
