'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _wd = require('wd');

var _wd2 = _interopRequireDefault(_wd);

var _wd3 = require('./wd.config');

var _wd4 = _interopRequireDefault(_wd3);

var _screenChecker = require('./screen-checker');

var _screenChecker2 = _interopRequireDefault(_screenChecker);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var driver = _wd2.default.promiseChainRemote(_wd4.default.url, _wd4.default.port);
var defaultOpts = _config2.default.testOptions;

global.describeAutomation = function (suiteName, testSuite, opts) {
    describe(suiteName, function () {
        opts = _extends({}, defaultOpts, opts);
        jest.setTimeout(opts.automationTimeout);

        beforeAll(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var error;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            console.log('Configuring Appium with: ', _wd4.default.device);
                            _context.next = 4;
                            return driver.init(_wd4.default.device);

                        case 4:
                            _context.next = 11;
                            break;

                        case 6:
                            _context.prev = 6;
                            _context.t0 = _context['catch'](0);

                            console.error('Error Initializing Driver', _context.t0);
                            error = JSON.parse(_context.t0.data);

                            error && console.error(error.value.message);

                        case 11:
                            _context.next = 13;
                            return driver.setImplicitWaitTimeout(opts.waitTimeout);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 6]]);
        })));

        if (opts.resetAfterEach) {
            beforeEach(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return driver.resetApp();

                            case 2:
                                return _context2.abrupt('return', _context2.sent);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined);
            })));
        }

        if (!opts.remainOpenAfterRunning) {
            afterAll(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return driver.quit();

                            case 2:
                                return _context3.abrupt('return', _context3.sent);

                            case 3:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined);
            })));
        }

        testSuite(driver, { screenChecker: new _screenChecker2.default(driver) });
    });
};