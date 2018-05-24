const fs = require('fs');
const getScreenshotPath = require('./getScreenshotPath');

function removeScreenshot(name, type) {
    return new Promise((resolve, reject) => {
        fs.unlink(getScreenshotPath(name, type), (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}


module.exports = removeScreenshot;