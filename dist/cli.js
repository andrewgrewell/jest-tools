#!/usr/bin/env node
'use strict';

var logMessage = require('./util/logMessage');

var _require = require('child_process'),
    spawn = _require.spawn,
    spawnSync = _require.spawnSync;

var argv = require('minimist')(process.argv.slice(2));
var config = require('./config');

// mapping of jest-tools command to child process args
var commands = {
    'test-ios': ['run-ios'],
    'test-android': ['run-android']
};

var input = argv._[0];
switch (input) {
    case 'test-ios':
    case 'test-android':
        buildAndRun(commands[input]).then(checkAppiumRunning).then(runTests).catch(function (err) {
            logMessage(err, 'error');
        });
        break;
    default:
        logCommandHelp();
}

function logCommandHelp() {
    var helpMessage = 'Usage: jest-tools [command]\n' + '\n' + 'Commands:\n' + '  test-ios              run end-to-end tests on iOS simulator\n' + '  test-android          run end-to-end tests on Android simulator\n' + '\n' + 'Documentation can be found at https://github.com/andrewgrewell/jest-tools\n';
    console.log(helpMessage);
}

function buildAndRun(args) {
    //8081 is the metro packager default, if it's running assume we already started up
    if (checkPortListening(8081)) {
        logMessage('App Already Running, Skipping Build');
        return Promise.resolve();
    }
    logMessage('Building and Starting App in Simulator');
    return new Promise(function (resolve, reject) {
        var buildProcess = spawn('react-native', args);
        buildProcess.stdout.on('data', function (data) {
            logOutput(data);
        });
        buildProcess.stderr.on('data', function (data) {
            logOutput(data, 'error');
        });
        buildProcess.on('exit', function (data) {
            logMessage('App Built and Started Successfully', 'success');
            var code = data.toString();
            if (code !== '0') {
                return reject('Build Exited with Code: ' + code);
            }
            resolve();
        });
    });
}

function checkAppiumRunning() {
    return new Promise(function (resolve, reject) {
        var env = argv.env || 'local';
        switch (env) {
            case 'saucelabs':
                logMessage('Checking Connection with SauceLabs');
                break;
            default:
                logMessage('Checking Appium is Running in Environment: \'' + env + '\'');
                var envConfig = config.appiumOptions[env];
                if (!envConfig) {
                    return reject('Missing Jest Tools Config for Environment: \'' + env + '\'');
                }
                if (!envConfig.port) {
                    return reject('Appium Port Not Specified in Jest Tools Config for Environment: \'' + env + '\'');
                }
                if (checkPortListening(envConfig.port)) {
                    logMessage('Appium is Running on Port: ' + envConfig.port);
                    return resolve();
                } else {
                    return reject('Appium Not Found on Port: ' + envConfig.port + '. \n              Ensure Appium is Running on Port: ' + envConfig.port);
                }
        }
    });
}

function runTests() {
    return new Promise(function (resolve, reject) {
        logMessage('-----------------------------------');
        logMessage('          Running Tests');
        logMessage('-----------------------------------');
        var jestArgs = '--testMatch=**/*e2e.js';
        var opts = {
            cwd: process.cwd(),
            env: Object.assign({}, process.env, {
                'E2E_PLATFORM': input.match(/test-(.+)/)[1]
            }),
            stdio: 'inherit'
        };
        var testProcess = spawn('node_modules/.bin/jest', [jestArgs], opts);
        testProcess.on('exit', function (data) {
            if (!data) {
                logMessage('Testing Aborted');
            }
            var code = data.toString();
            if (code !== '0') {
                logMessage('-----------------------------------', 'error');
                return reject('   Tests Failed with Code: ' + code);
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
    var _spawnSync = spawnSync('lsof', ['-n', '-i:' + port]),
        output = _spawnSync.output;

    return !!output.toString().match(/LISTEN/g);
}