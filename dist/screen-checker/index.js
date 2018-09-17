'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sleep = require('../util/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _compareScreenshots = require('./compareScreenshots');

var _compareScreenshots2 = _interopRequireDefault(_compareScreenshots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScreenChecker = function () {
    function ScreenChecker(driver) {
        _classCallCheck(this, ScreenChecker);

        this.driver = driver;
    }

    _createClass(ScreenChecker, [{
        key: '_reset',
        value: function _reset() {
            this.nextWaitMs = null;
            this.nextWaitForElement = null;
        }
    }, {
        key: 'waitMs',
        value: function waitMs(ms) {
            this.nextWaitMs = ms;
            return this;
        }
    }, {
        key: 'waitForElement',
        value: function waitForElement(accessibilityLabel) {
            this.nextWaitForElement = accessibilityLabel;
            return this;
        }
    }, {
        key: 'checkScreen',
        value: function checkScreen(name, opts) {
            var _this = this;

            test('[ScreenChecker] ' + name + ' looks as expected', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var passed;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!_this.nextWaitForElement) {
                                    _context.next = 3;
                                    break;
                                }

                                _context.next = 3;
                                return _this.driver.waitForElementByAccessibilityId(_this.nextWaitForElement);

                            case 3:
                                _context.next = 5;
                                return (0, _sleep2.default)(_this.nextWaitMs || 0);

                            case 5:
                                _context.next = 7;
                                return (0, _compareScreenshots2.default)(_this.driver, _extends({ name: name }, opts));

                            case 7:
                                passed = _context.sent;

                                expect(passed).toBe(true);
                                _this._reset();

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            })));
        }
    }]);

    return ScreenChecker;
}();

exports.default = ScreenChecker;