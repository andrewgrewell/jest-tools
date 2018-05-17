const logMessage = require('../util/logMessage');
const flatten = require('lodash/flatten');
const config = require('../config');
const readDirectoryFiles = require('../util/readDirectoryFiles');
const path = require('path');
// const inquirer = require('inquirer');
// const exec = require('child_process').exec;


class CustomReporter {

    onRunComplete(contexts, testResult) {
        let jestScreenCheckResults = parseJestResults(testResult);
        let screenCheckResults = parseScreenCheckResults();
    }
}

function parseJestResults(jestResult) {
    let screenCheckResults = flatten(jestResult.testResults.map(suiteResult => suiteResult.testResults))
        .reduce((result, tr) => {
            if (/\[ScreenChecker\]/.test(tr.title)) {
                let match = tr.title.match(/\[ScreenChecker\] (.+) looks as expected/);
                if (match) {
                    result[match[1]] = tr;
                }
            }
            return result;
        }, {});
    //console.log('Screen check results: ', screenCheckResults);
}

function parseScreenCheckResults() {
    readDirectoryFiles(path.resolve(config.outputPath, './screenshots'))
        .then((screenCheckResults) => {
            console.log('screen check results: ', screenCheckResults);
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