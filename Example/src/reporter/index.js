const fs = require('fs');
const flatten = require('lodash/flatten');
const some = require('lodash/some');
const config = require('../config');
const readDirectoryFiles = require('../util/readDirectoryFiles');
const path = require('path');
// const inquirer = require('inquirer');
// const exec = require('child_process').exec;


class CustomReporter {

    onRunComplete(contexts, testResult) {
        let jestScreenCheckResults = parseJestResults(testResult);
        parseScreenCheckResults(jestScreenCheckResults)
            .then((screenCheckResults) => {
                logResults(screenCheckResults);

                if (some(screenCheckResults, result => result.status !== 'pass')) {
                    // show inquirerer prompt for non passing screen checks
                    console.log('show inquirer prompt to fix screens');
                }
            });
    }
}

function logResults(screenCheckResults) {
    console.log('\x1b[36m', '---------------------------------');
    console.log('\x1b[36m', '       Screen Check Results      ');
    console.log('\x1b[36m', '---------------------------------', '\x1b[0m');
    screenCheckResults.forEach((result) => {
        logStatus(result.name, result.status);
        if (result.status === 'pass' && !config.reporterOptions.verbose) {
            return;
        }
        console.log(`  • Screenshot Sensitivity: ${result.screenshotSensitivity}`);
        console.log(`  • Warn Threshold: ${result.warnThreshold}`);
        console.log(`  • Fail Threshold: ${result.failThreshold}`);
        console.log(`  • Percent Change: ${result.percentDiff}`);
        console.log(`  • Pixel Change: ${result.pxDiff}`);
        console.log('____________________');
    });
}

function logStatus(name, status) {
    function makeColor(value) {
        return `\x1b[${value}m`;
    }
    let colorInt;
    switch (status) {
        case 'fail':
        case 'obsolete': colorInt = 41; break;
        case 'pass': colorInt = 42; break;
        case 'warn': colorInt = 43; break;
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
    return readDirectoryFiles(path.resolve(config.outputPath, './results'))
        .then((screenCheckFiles) => {
            return screenCheckFiles.map((filePath) => {
                let result = JSON.parse(fs.readFileSync(filePath));
                //console.log('Screen Check Result: ', result);
                let testRan = !!jestScreenCheckResults[result.name];
                if (!testRan) {
                    result.status = 'obsolete';
                }
                return result;
            });
        });
    // inquirer.prompt([
    //     {
    //         name: 'test',
    //         type: 'input',
    //         message: 'Screen Check Failed for TestScreen\nWould you like to update?'
    //     }
    // ]).then(answers => {
    //     console.log('go through and update shots accordingly');
    //     exec(`open /Users/osi/development/packages/react-native-jest/Example/src/screen-checker/screenshots/ScreenTwo/baseline.png`)
    // });
}


module.exports = CustomReporter;