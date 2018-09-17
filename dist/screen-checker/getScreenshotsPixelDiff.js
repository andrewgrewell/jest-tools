'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScreenshotsPixelDiff;

var _pixelmatch = require('pixelmatch');

var _pixelmatch2 = _interopRequireDefault(_pixelmatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScreenshotsPixelDiff(baseline, latest, diff, opts) {
    return (0, _pixelmatch2.default)(baseline.data, latest.data, diff.data, baseline.width, baseline.height, {
        threshold: opts.screenshotSensitivity
    });
}