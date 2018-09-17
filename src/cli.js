#!/usr/bin/env node
const logMessage = require('./util/logMessage');
const { spawn, spawnSync } = require('child_process');
const argv = require('minimist')(process.argv.slice(2));
const config = require('./config');

// mapping of jest-tools command to child process args
const commands = {
    'test-ios': ['run-ios'],
    'test-android': ['run-android']
};

let input = argv._[0];
switch(input) {
    case 'test-ios':
    case 'test-android':
        buildAndRun(commands[input])
            .then(checkAppiumRunning)
            .then(runTests)
            .catch((err) => {
                logMessage(err, 'error');
            });
        break;
    default: logCommandHelp();
}

function logCommandHelp() {
    let helpMessage = (
        'Usage: jest-tools [command]\n' +
        '\n' +
        'Commands:\n' +
        '  test-ios              run end-to-end tests on iOS simulator\n' +
        '  test-android          run end-to-end tests on Android simulator\n' +
        '\n'+
        'Documentation can be found at https://github.com/andrewgrewell/jest-tools\n'
    );
    console.log(helpMessage);
}



function buildAndRun(args) {
    //8081 is the metro packager default, if it's running assume we already started up
    if (checkPortListening(8081)) {
        logMessage('App Already Running, Skipping Build');
        return Promise.resolve()
    }
    logMessage('Building and Starting App in Simulator');
    return new Promise((resolve, reject) => {
        let buildProcess = spawn('react-native', args);
        buildProcess.stdout.on('data', (data) => {
            logOutput(data);
        });
        buildProcess.stderr.on('data', (data) => {
            logOutput(data, 'error');
        });
        buildProcess.on('exit', (data) => {
            logMessage('App Built and Started Successfully', 'success');
            let code = data.toString();
            if (code !== '0') {
                return reject(`Build Exited with Code: ${code}`);
            }
            resolve();
        });
    });
}

function checkAppiumRunning() {
    return new Promise((resolve, reject) => {
        let env = argv.env || 'local';
        switch (env) {
            case 'saucelabs':
                logMessage('Checking Connection with SauceLabs');
                break;
            default:
                logMessage(`Checking Appium is Running in Environment: '${env}'`);
                let envConfig = config.appiumOptions[env];
                if (!envConfig) {
                    return reject(`Missing Jest Tools Config for Environment: '${env}'`);
                }
                if (!envConfig.port) {
                    return reject(`Appium Port Not Specified in Jest Tools Config for Environment: '${env}'`);
                }
                if (checkPortListening(envConfig.port)) {
                    logMessage(`Appium is Running on Port: ${envConfig.port}`);
                    return resolve();
                }
                else {
                    return reject(
                        `Appium Not Found on Port: ${envConfig.port}. 
              Ensure Appium is Running on Port: ${envConfig.port}`
                    );
                }
        }
    });

}

function runTests() {
    return new Promise((resolve, reject) => {
        logMessage('-----------------------------------');
        logMessage('          Running Tests');
        logMessage('-----------------------------------');
        let jestArgs = `--testMatch=**/*e2e.js`;
        let opts = {
            cwd: process.cwd(),
            env: Object.assign({}, process.env, {
                'E2E_PLATFORM': input.match(/test-(.+)/)[1]
            }),
            stdio: 'inherit'
        };
        let testProcess = spawn('node_modules/.bin/jest', [jestArgs], opts);
        testProcess.on('exit', (data) => {
            if (data == null) {
                logMessage('Testing Aborted');
            }
            let code = data.toString();
            if (code !== '0') {
                logMessage('-----------------------------------', 'error');
                return reject(`   Tests Failed with Code: ${code}`)
            }
            logMessage('Testing Complete', 'success');
            resolve();
        });
    });
}

function logOutput(buffer, type) {
    logMessage(buffer.toString().replace(/^\s+|\s+$/g, ''), type);
}

function checkPortListening(port) {
    let { output } = spawnSync('lsof', ['-n', `-i:${port}`]);
    return !!output.toString().match(/LISTEN/g);
}

