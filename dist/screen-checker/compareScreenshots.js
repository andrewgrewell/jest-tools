'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _pngjs = require('pngjs');

var _ensureBaselineExists = require('./ensureBaselineExists');

var _ensureBaselineExists2 = _interopRequireDefault(_ensureBaselineExists);

var _parseScreenshot = require('./parseScreenshot');

var _parseScreenshot2 = _interopRequireDefault(_parseScreenshot);

var _writeScreenCheckResults = require('./writeScreenCheckResults');

var _writeScreenCheckResults2 = _interopRequireDefault(_writeScreenCheckResults);

var _writeScreenshot = require('./writeScreenshot');

var _writeScreenshot2 = _interopRequireDefault(_writeScreenshot);

var _removeScreenshot = require('./removeScreenshot');

var _removeScreenshot2 = _interopRequireDefault(_removeScreenshot);

var _writeScreenshotDiff = require('./writeScreenshotDiff');

var _writeScreenshotDiff2 = _interopRequireDefault(_writeScreenshotDiff);

var _getScreenshotsPixelDiff = require('./getScreenshotsPixelDiff');

var _getScreenshotsPixelDiff2 = _interopRequireDefault(_getScreenshotsPixelDiff);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver, opts) {
        var baselineExists, screenshot, baseline, latest, diff, pxDiff, percentDiff, baseResults;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        opts = Object.assign({}, _config2.default.screenCheckerOptions, opts);
                        _context.next = 3;
                        return (0, _ensureBaselineExists2.default)(opts.name);

                    case 3:
                        baselineExists = _context.sent;
                        _context.next = 6;
                        return driver.takeScreenshot();

                    case 6:
                        screenshot = _context.sent;

                        if (baselineExists) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 10;
                        return (0, _writeScreenshot2.default)(opts.name, 'baseline', screenshot);

                    case 10:
                        _context.next = 12;
                        return (0, _writeScreenCheckResults2.default)(_extends({}, opts, {
                            pxDiff: 0,
                            percentDiff: 0,
                            status: 'skipped'
                        }));

                    case 12:
                        return _context.abrupt('return', true);

                    case 15:
                        _context.next = 17;
                        return (0, _writeScreenshot2.default)(opts.name, 'latest', screenshot);

                    case 17:
                        _context.next = 19;
                        return (0, _parseScreenshot2.default)(opts.name, 'baseline');

                    case 19:
                        baseline = _context.sent;
                        _context.next = 22;
                        return (0, _parseScreenshot2.default)(opts.name, 'latest');

                    case 22:
                        latest = _context.sent;
                        diff = new _pngjs.PNG({ width: baseline.width, height: baseline.height });
                        pxDiff = (0, _getScreenshotsPixelDiff2.default)(baseline, latest, diff, opts);
                        percentDiff = pxDiff / baseline.totalPx;
                        baseResults = _extends({}, opts, {
                            pxDiff: pxDiff,
                            percentDiff: percentDiff
                        });

                        if (!(percentDiff > opts.failThreshold)) {
                            _context.next = 35;
                            break;
                        }

                        _context.next = 30;
                        return (0, _writeScreenshotDiff2.default)(opts.name, diff);

                    case 30:
                        _context.next = 32;
                        return (0, _writeScreenCheckResults2.default)(_extends({}, baseResults, {
                            status: 'fail'
                        }));

                    case 32:
                        return _context.abrupt('return', false);

                    case 35:
                        if (!(percentDiff > opts.warnThreshold)) {
                            _context.next = 41;
                            break;
                        }

                        _context.next = 38;
                        return (0, _writeScreenshotDiff2.default)(opts.name, diff);

                    case 38:
                        _context.next = 40;
                        return (0, _writeScreenCheckResults2.default)(_extends({}, baseResults, {
                            status: 'warn'
                        }));

                    case 40:
                        return _context.abrupt('return', true);

                    case 41:
                        (0, _removeScreenshot2.default)(opts.name, 'latest');
                        _context.next = 44;
                        return (0, _writeScreenCheckResults2.default)(_extends({}, baseResults, {
                            status: 'pass'
                        }));

                    case 44:
                        return _context.abrupt('return', true);

                    case 45:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function compareScreenshots(_x, _x2) {
        return _ref.apply(this, arguments);
    }

    return compareScreenshots;
}();