'use strict';

var fs = require('fs');
var path = require('path');
var mergeWith = require('lodash.mergewith');

var consumerConfig = void 0;
try {
    var configJson = void 0;
    try {
        configJson = fs.readFileSync(path.resolve(process.cwd(), 'jesttools.config.json'), 'utf8');
    } catch (err) {
        var pkgJson = require(path.resolve(process.cwd(), 'package.json'));
        if (pkgJson) {
            configJson = pkgJson['jest-tools'];
        }
    }
    consumerConfig = JSON.parse(configJson);
} catch (err) {
    // no config
    consumerConfig = {};
}

var defaultScreenCheckerOptions = {
    warnThreshold: 0.001,
    failThreshold: 0.005,
    screenshotSensitivity: 0.1
};

var defaultReporterOptions = {
    outputPath: path.resolve(process.cwd(), './jesttools')
};

var defaultAppiumOptions = {
    local: {
        url: 'localhost',
        port: 4723,
        ios: {
            appPath: process.cwd() + '/ios/build/Build/Products/Debug-iphonesimulator/Example.app',
            installPause: 1000,
            platformVersion: '11.4',
            deviceName: 'iPhone Simulator',
            automationName: 'XCUITest'
        },
        android: {
            appPath: process.cwd() + '/android/app/build/outputs/apk/app-release.apk',
            deviceName: 'Android Emulator'
        },
        userInfo: {
            userId: 35,
            email: 'user35@provatahealth.com',
            password: 'Passw0rd'
        }
    },
    saucelabs: {
        url: 'to do',
        port: 'to do',
        userInfo: {}
    }
};

var defaultTestOptions = {
    automationTimeout: 60000,
    waitTimeout: 10000,
    resetAfterEach: false,
    remainOpenAfterRunning: false
};

function mergeConfig(objValue, srcValue) {
    if (typeof srcValue === 'string') {
        return srcValue.replace('<rootDir>', process.cwd());
    }
}

module.exports = {
    testOptions: mergeWith(defaultTestOptions, consumerConfig.testOptions || {}, mergeConfig()),
    appiumOptions: mergeWith(defaultAppiumOptions, consumerConfig.appiumOptions || {}, mergeConfig),
    reporterOptions: mergeWith(defaultReporterOptions, consumerConfig.reporterOptions || {}, mergeConfig),
    screenCheckerOptions: mergeWith(defaultScreenCheckerOptions, consumerConfig.screenCheckerOptions || {}, mergeConfig)
};