'use strict';

var fs = require('fs');
var dirname = require('path').dirname;
var makeDirectory = require('./makeDirectory');

function writeFile(filePath, contents, opts) {
    return new Promise(function (resolve, reject) {
        makeDirectory(dirname(filePath)).then(function () {
            fs.writeFile(filePath, contents, opts, function (err) {
                if (err) {
                    reject(err);
                }
                resolve(filePath);
            });
        }).catch(reject);
    });
}

module.exports = writeFile;