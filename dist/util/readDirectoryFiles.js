'use strict';

var recursive = require('recursive-readdir');

function readDirectoryFiles(rootPath) {
    var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    ignore = Array.isArray(ignore) ? ignore : [ignore];

    return new Promise(function (resolve, reject) {
        recursive(rootPath, ignore, function (err, files) {
            if (err) {
                reject(err);
            }
            resolve(files);
        });
    });
}

module.exports = readDirectoryFiles;