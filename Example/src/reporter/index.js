const logMessage = require('../util/logMessage');
const flatten = require('lodash/flatten');
const config = require('../config');
// const inquirer = require('inquirer');
// const exec = require('child_process').exec;


class CustomReporter {

    onRunComplete(contexts, testResult) {
        //parseScreenCheckResults();
    }
}

function parseScreenCheckResults() {
    let screenCheckResults = '';
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