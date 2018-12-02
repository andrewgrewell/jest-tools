'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _marked = /*#__PURE__*/regeneratorRuntime.mark(makePrompter);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');
var flatten = require('lodash/flatten');
var filter = require('lodash/filter');
var config = require('../config');
var readDirectoryFiles = require('../util/readDirectoryFiles');
var removeScreenshot = require('../screen-checker/removeScreenshot');
var inquirer = require('inquirer');
var logMessage = require('../util/logMessage');

var CustomReporter = function () {
    function CustomReporter() {
        _classCallCheck(this, CustomReporter);
    }

    _createClass(CustomReporter, [{
        key: 'onRunComplete',
        value: function onRunComplete(contexts, testResult) {
            parseScreenCheckResults(parseJestResults(testResult)).then(function (screenCheckResults) {
                logBanner();
                logResults(screenCheckResults);
                var nonPassingResults = filter(screenCheckResults, function (result) {
                    return result.status !== 'pass' && result.status !== 'skipped';
                });
                if (nonPassingResults.length) {
                    // show inquirerer prompt for non passing screen checks
                    inquirer.prompt([{
                        name: 'shouldContinue',
                        type: 'list',
                        choices: [{ name: 'Yes', value: 1 }, { name: 'No, update all baselines', value: 0 }],
                        message: 'Screens have changed, would you like to review?'
                    }]).then(function (_ref) {
                        var shouldContinue = _ref.shouldContinue;

                        if (!shouldContinue) {
                            console.log('update all baselines...');
                        } else {
                            promptUpdateResults(nonPassingResults).then(function () {
                                console.log('all prompts finished');
                            });
                        }
                    });
                }
            }).catch(function (err) {
                // do nothing
            });
        }
    }]);

    return CustomReporter;
}();

function logBanner() {
    console.log('\x1b[36m', '       Screen Check Results      ');
    console.log('\x1b[36m', '---------------------------------', '\x1b[0m');
}

function logResults(screenCheckResults) {
    screenCheckResults.forEach(function (result) {
        logResultInfo(result);
    });
}

function logResultInfo(result, verbose) {
    logStatus(result.name, result.status);
    if (!verbose) {
        return;
    }
    console.log('  \u2022 Screenshot Sensitivity: ' + result.screenshotSensitivity);
    console.log('  \u2022 Warn Threshold: ' + result.warnThreshold);
    console.log('  \u2022 Fail Threshold: ' + result.failThreshold);
    console.log('  \u2022 Percent Change: ' + result.percentDiff);
    console.log('  \u2022 Pixel Change: ' + result.pxDiff);
    console.log('____________________');
}

function logStatus(name, status) {
    function makeColor(value) {
        return '\x1B[' + value + 'm';
    }
    var colorInt = void 0;
    switch (status) {
        case 'fail':
        case 'obsolete':
            colorInt = 41;break;
        case 'warn':
            colorInt = 43;break;
        case 'pass':
            colorInt = 42;break;
        default:
            colorInt = 42;
    }
    console.log('' + makeColor(colorInt) + makeColor(1) + ' ' + status.toUpperCase(), '\x1b[0m', name);
}

function parseJestResults(jestResult) {
    return flatten(jestResult.testResults.map(function (suiteResult) {
        return suiteResult.testResults;
    })).reduce(function (result, tr) {
        if (/\[ScreenChecker\]/.test(tr.title)) {
            var match = tr.title.match(/\[ScreenChecker\] (.+) looks as expected/);
            if (match) {
                result[match[1]] = tr;
            }
        }
        return result;
    }, {});
}

function parseScreenCheckResults(jestScreenCheckResults) {
    return readDirectoryFiles(path.resolve(config.reporterOptions.outputPath, './results')).then(function (screenCheckFiles) {
        return screenCheckFiles.map(function (filePath) {
            var result = JSON.parse(fs.readFileSync(filePath));
            var testRan = !!jestScreenCheckResults[result.name];
            if (!testRan) {
                result.status = 'obsolete';
            }
            return result;
        });
    });
}

function promptUpdateResults(nonPassingResults) {
    return prompt(makePrompter(nonPassingResults));
}

function makePrompter(nonPassingResults) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, result;

    return regeneratorRuntime.wrap(function makePrompter$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context.prev = 3;
                    _iterator = nonPassingResults[Symbol.iterator]();

                case 5:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context.next = 12;
                        break;
                    }

                    result = _step.value;
                    _context.next = 9;
                    return promptUpdateResult(result);

                case 9:
                    _iteratorNormalCompletion = true;
                    _context.next = 5;
                    break;

                case 12:
                    _context.next = 18;
                    break;

                case 14:
                    _context.prev = 14;
                    _context.t0 = _context['catch'](3);
                    _didIteratorError = true;
                    _iteratorError = _context.t0;

                case 18:
                    _context.prev = 18;
                    _context.prev = 19;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 21:
                    _context.prev = 21;

                    if (!_didIteratorError) {
                        _context.next = 24;
                        break;
                    }

                    throw _iteratorError;

                case 24:
                    return _context.finish(21);

                case 25:
                    return _context.finish(18);

                case 26:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this, [[3, 14, 18, 26], [19,, 21, 25]]);
}

function prompt(prompter, rootResolve) {
    return new Promise(function (resolve, reject) {
        var currentPrompt = prompter.next();
        if (currentPrompt.done) {
            rootResolve();
        } else {
            currentPrompt.value.then(function () {
                return prompt(prompter, rootResolve || resolve);
            });
        }
    });
}

function promptUpdateResult(result) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { verbose: true };

    return new Promise(function (resolve, reject) {
        logResultInfo(result, opts.verbose);
        inquirer.prompt([{
            name: 'action',
            type: 'list',
            choices: [{
                name: 'View Diff',
                value: 1
            }, {
                name: 'View Baseline',
                value: 2
            }, {
                name: 'View Latest',
                value: 3
            }, {
                name: 'Update Baseline',
                value: 4
            }, {
                name: 'Confirm Regression',
                value: 5
            }],
            message: 'Select an action'
        }]).then(function (_ref2) {
            var action = _ref2.action;

            var promiseAction = void 0;
            switch (action) {
                case 1:
                    openImage(result.name, 'diff');break;
                case 2:
                    openImage(result.name, 'baseline');break;
                case 3:
                    openImage(result.name, 'latest');break;
                case 4:
                    promiseAction = updateBaseline(result.name);break;
                case 5:
                    promiseAction = removeNonBaseline(result.name);break;
            }
            if (action === 4 || action === 5) {
                promiseAction.then(function () {
                    opts.resolve ? opts.resolve() : resolve();
                });
            } else {
                promptUpdateResult(result, {
                    verbose: true,
                    resolve: resolve
                });
            }
        });
    });
}

function openImage(screenName, type) {
    exec('open ' + config.reporterOptions.outputPath + '/screenshots/' + screenName + '/' + type + '.png');
}

function removeNonBaseline(name) {
    return removeScreenshot(name, 'latest').then(function () {
        removeScreenshot(name, 'diff');
    });
}

function updateBaseline(name) {
    var makePath = function makePath(type) {
        return config.reporterOptions.outputPath + '/screenshots/' + name + '/' + type + '.png';
    };
    return new Promise(function (resolve, reject) {
        Promise.resolve().then(function () {
            return removeScreenshot(name, 'baseline');
        }).then(function () {
            return removeScreenshot(name, 'diff');
        }).then(function () {
            fs.rename(makePath('latest'), makePath('baseline'), function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        }).catch(function (err) {
            return reject(err);
        });
    });
}

module.exports = CustomReporter;