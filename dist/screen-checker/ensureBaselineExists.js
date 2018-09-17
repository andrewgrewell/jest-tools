'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ensureScreenshotsExists;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _getScreenshotPath = require('./getScreenshotPath');

var _getScreenshotPath2 = _interopRequireDefault(_getScreenshotPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureScreenshotsExists(name) {
    return new Promise(function (resolve, reject) {
        if (_fs2.default.existsSync((0, _getScreenshotPath2.default)(name, 'baseline'))) {
            resolve(true);
        }
        resolve(false);
    });
}