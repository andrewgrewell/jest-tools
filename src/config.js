const fs = require('fs');
const path = require('path');
const mergeWith = require('lodash.mergewith');

let consumerConfig;
try {
    let configJson;
    try {
        configJson = fs.readFileSync(path.resolve(process.cwd(), 'jesttools.config.json'), 'utf8')
    }
    catch (err) {
        let pkgJson = require(path.resolve(process.cwd(), 'package.json'));
        if (pkgJson) {
            configJson = pkgJson['jest-tools'];
        }
    }
    consumerConfig = JSON.parse(configJson);
}
catch (err) {
    // no config
    consumerConfig = {};
}

const defaultScreenCheckerOptions = {
    warnThreshold: 0.001,
    failThreshold: 0.005,
    screenshotSensitivity: 0.1
};

const defaultReporterOptions = {
    outputPath: path.resolve(process.cwd(), './jesttools')
};

const defaultAppiumOptions = {
    local: {
        url: 'localhost',
        port: 4723,
        ios: {
            appPath: `${process.cwd()}/ios/build/Build/Products/Debug-iphonesimulator/Example.app`,
            installPause: 1000,
            platformVersion: '11.4',
            deviceName: 'iPhone Simulator',
            automationName: 'XCUITest',
        },
        android: {
            appPath: `${process.cwd()}/android/app/build/outputs/apk/app-release.apk`,
            deviceName: 'Android Emulator',
            automationName: 'UiAutomator2',
            platformVersion: '8.0.0'
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

const defaultTestOptions = {
    automationTimeout: 60000,
    waitTimeout: 10000,
    resetAfterEach: false,
    remainOpenAfterRunning: false
};

function mergeConfig(objValue, srcValue) {
    if ((typeof srcValue === 'string')) {
        return srcValue.replace('<rootDir>', process.cwd());
    }
}

module.exports = {
    testOptions: mergeWith(defaultTestOptions, consumerConfig.testOptions || {}, mergeConfig()),
    appiumOptions: mergeWith(defaultAppiumOptions, consumerConfig.appiumOptions || {}, mergeConfig),
    reporterOptions: mergeWith(defaultReporterOptions, consumerConfig.reporterOptions || {}, mergeConfig),
    screenCheckerOptions: mergeWith(defaultScreenCheckerOptions, consumerConfig.screenCheckerOptions || {}, mergeConfig)
};