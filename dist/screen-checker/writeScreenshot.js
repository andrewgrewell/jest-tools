'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _writeFile = require('../util/writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _getScreenshotPath = require('./getScreenshotPath');

var _getScreenshotPath2 = _interopRequireDefault(_getScreenshotPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, type, content) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', (0, _writeFile2.default)(_path2.default.resolve((0, _getScreenshotPath2.default)(name, type)), content, 'base64'));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function writeScreenshot(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    }

    return writeScreenshot;
}();