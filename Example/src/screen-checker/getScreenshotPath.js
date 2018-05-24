const path = require('path');
const config = require('../config');

function getScreenshotPath(name, type) {
    return `${path.resolve(config.outputPath)}/screenshots/${name}/${type}.png`;
}


module.exports = getScreenshotPath;