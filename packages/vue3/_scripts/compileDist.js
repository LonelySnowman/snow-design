const webpack = require('webpack');
const config = require('./config/webpack.config');

function compile() {
    return new Promise((resolve, reject) => {
        webpack(config({ minimize: false }), (err, stats) => {
            if (err) {
                console.error('================');
                console.error(err);
                reject(err);
                return;
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                (info.errors || []).forEach(error => {
                    console.error('================');
                    console.error(error);
                });
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function compileMin() {
    return new Promise((resolve, reject) => {
        webpack(config({ minimize: true }), (err, stats) => {
            if (err) {
                console.error('================');
                console.error(err);
                reject(err);
            }
            const info = stats.toJson();
            if (stats.hasErrors()) {
                (info.errors || []).forEach(error => {
                    console.error('================');
                    console.error(error);
                    reject(err);
                });
            }
            resolve();
        });
    });
}

compile().then(compileMin);