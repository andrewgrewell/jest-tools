'use strict';

var mkdirp = require('mkdirp');

function makeDirectory(path) {
    return new Promise(function (resolve, reject) {
        mkdirp(path, function (err) {
            if (err) {
                reject(err);
            }
            resolve(path);
        });
    });
}

module.exports = makeDirectory;