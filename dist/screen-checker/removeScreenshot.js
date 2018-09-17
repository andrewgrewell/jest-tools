'use strict';

var fs = require('fs');
var getScreenshotPath = require('./getScreenshotPath');

function removeScreenshot(name, type) {
    return new Promise(function (resolve, reject) {
        fs.unlink(getScreenshotPath(name, type), function (err) {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

module.exports = removeScreenshot;