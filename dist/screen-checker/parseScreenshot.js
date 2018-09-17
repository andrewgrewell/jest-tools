'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseScreenshot;

var _pngjs = require('pngjs');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseScreenshot(name, type) {
    return new Promise(function (resolve, reject) {
        var screenshotPath = _path2.default.resolve(_config2.default.reporterOptions.outputPath, './screenshots/' + name + '/' + type + '.png');
        var screenshot = _fs2.default.createReadStream(screenshotPath).pipe(new _pngjs.PNG()).on('parsed', function () {
            resolve({
                data: screenshot.data,
                width: screenshot.width,
                height: screenshot.height,
                totalPx: screenshot.width * screenshot.height
            });
        });
    });
}