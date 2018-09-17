'use strict';

var path = require('path');
var config = require('../config');

function getScreenshotPath(name, type) {
    return path.resolve(config.reporterOptions.outputPath) + '/screenshots/' + name + '/' + type + '.png';
}

module.exports = getScreenshotPath;