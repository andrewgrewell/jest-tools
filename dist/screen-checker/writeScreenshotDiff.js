'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = writeScreenshotDiff;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _getScreenshotPath = require('./getScreenshotPath');

var _getScreenshotPath2 = _interopRequireDefault(_getScreenshotPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeScreenshotDiff(name, diff) {
    return new Promise(function (resolve, reject) {
        var stream = _fs2.default.createWriteStream((0, _getScreenshotPath2.default)(name, 'diff'));
        diff.pack().pipe(stream);
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}