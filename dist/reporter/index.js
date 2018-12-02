const path = require('path');
const exec = require('child_process').exec;
const fs = require('fs');
const flatten = require('lodash/flatten');
const filter = require('lodash/filter');
const config = require('../config');
const readDirectoryFiles = require('../util/readDirectoryFiles');
const removeScreenshot = require('../screen-checker/removeScreenshot');
const inquirer = require('inquirer');
const logMessage = require('../util/logMessage');


class CustomReporter {
    onRunComplete(contexts, testResult) {
        parseScreenCheckResults(parseJestResults(testResult))
            .then((screenCheckResults) => {
                logBanner();
                logResults(screenCheckResults);
                let nonPassingResults = filter(screenCheckResults, result => result.status !== 'pass' && result.status !== 'skipped');
                if (nonPassingResults.length) {
                    // show inquirerer prompt for non passing screen checks
                    inquirer.prompt([
                        {
                            name: 'shouldContinue',
                            type: 'list',
                            choices: [{ name: 'Yes', value: 1 }, { name: 'No, update all baselines', value: 0 }],
                            message: 'Screens have changed, would you like to review?'
                        }
                    ]).then(({ shouldContinue }) => {
                        if (!shouldContinue) {
                            console.log('update all baselines...');
                        }
                        else {
                            promptUpdateResults(nonPassingResults)
                                .then(() => {
                                    console.log('all prompts finished');
                                });
                        }
                    });
                }
            })
            .catch((err) => {
                // do nothing
            })
    }
}

function logBanner() {
    console.log('\x1b[36m', '       Screen Check Results      ');
    console.log('\x1b[36m', '---------------------------------', '\x1b[0m');
}

function logResults(screenCheckResults) {
    screenCheckResults.forEach((result) => {
        logResultInfo(result);
    });
}

function logResultInfo(result, verbose) {
    logStatus(result.name, result.status);
    if (!verbose) {
        return;
    }
    console.log(`  • Screenshot Sensitivity: ${result.screenshotSensitivity}`);
    console.log(`  • Warn Threshold: ${result.warnThreshold}`);
    console.log(`  • Fail Threshold: ${result.failThreshold}`);
    console.log(`  • Percent Change: ${result.percentDiff}`);
    console.log(`  • Pixel Change: ${result.pxDiff}`);
    console.log('____________________');
}

function logStatus(name, status) {
    function makeColor(value) {
        return `\x1b[${value}m`;
    }
    let colorInt;
    switch (status) {
        case 'fail':
        case 'obsolete': colorInt = 41; break;
        case 'warn': colorInt = 43; break;
        case 'pass': colorInt = 42; break;
        default: colorInt = 42;
    }
    console.log(`${makeColor(colorInt)}${makeColor(1)} ${status.toUpperCase()}`, '\x1b[0m', name);
}

function parseJestResults(jestResult) {
    return flatten(jestResult.testResults.map(suiteResult => suiteResult.testResults))
        .reduce((result, tr) => {
            if (/\[ScreenChecker\]/.test(tr.title)) {
                let match = tr.title.match(/\[ScreenChecker\] (.+) looks as expected/);
                if (match) {
                    result[match[1]] = tr;
                }
            }
            return result;
        }, {});
}

function parseScreenCheckResults(jestScreenCheckResults) {
    return readDirectoryFiles(path.resolve(config.reporterOptions.outputPath, './results'))
        .then((screenCheckFiles) => {
            return screenCheckFiles.map((filePath) => {
                let result = JSON.parse(fs.readFileSync(filePath));
                let testRan = !!jestScreenCheckResults[result.name];
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

function * makePrompter(nonPassingResults) {
    for (let result of nonPassingResults) {
        yield promptUpdateResult(result);
    }
}

function prompt(prompter, rootResolve) {
    return new Promise((resolve, reject) => {
        let currentPrompt = prompter.next();
        if (currentPrompt.done) {
            rootResolve();
        }
        else {
            currentPrompt.value.then(() => prompt(prompter, rootResolve || resolve));
        }
    });
}

function promptUpdateResult(result, opts = { verbose: true }) {
    return new Promise((resolve, reject) => {
        logResultInfo(result, opts.verbose);
        inquirer.prompt([
            {
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
            }
        ]).then(({ action }) => {
            let promiseAction;
            switch (action) {
                case 1: openImage(result.name, 'diff'); break;
                case 2: openImage(result.name, 'baseline'); break;
                case 3: openImage(result.name, 'latest'); break;
                case 4: promiseAction = updateBaseline(result.name); break;
                case 5: promiseAction = removeNonBaseline(result.name); break;
            }
            if (action === 4 || action === 5) {
                promiseAction.then(() => {
                    opts.resolve ? opts.resolve() : resolve();
                });
            }
            else {
                promptUpdateResult(result, {
                    verbose: true,
                    resolve
                });
            }
        });
    });
}

function openImage(screenName, type) {
    exec(`open ${config.reporterOptions.outputPath}/screenshots/${screenName}/${type}.png`);
}

function removeNonBaseline(name) {
    return removeScreenshot(name, 'latest')
        .then(() => {
            removeScreenshot(name, 'diff');
        });
}

function updateBaseline(name) {
    const makePath = (type) => `${config.reporterOptions.outputPath}/screenshots/${name}/${type}.png`;
    return new Promise((resolve, reject) => {
        Promise.resolve()
            .then(() => removeScreenshot(name, 'baseline'))
            .then(() => removeScreenshot(name, 'diff'))
            .then(() => {
                fs.rename(makePath('latest'), makePath('baseline'), (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
            })
            .catch((err) => reject(err));
    });

}


module.exports = CustomReporter;