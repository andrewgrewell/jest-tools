'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var config = require('./config');

var wdConfig = {
    get url() {
        switch (process.env.E2E_PLATFORM) {
            case 'saucelabs':
                return config.appiumOptions.saucelabs.url;
            default:
                return config.appiumOptions.local.url;
        }
    },
    get port() {
        switch (process.env.E2E_PLATFORM) {
            case 'saucelabs':
                return config.appiumOptions.saucelabs.port;
            default:
                return config.appiumOptions.local.port;
        }
    },
    get device() {
        switch (process.env.E2E_PLATFORM) {
            case 'ios':
                return _extends({
                    platformName: 'iOS',
                    deviceName: config.appiumOptions.local.ios.deviceName,
                    automationName: config.appiumOptions.local.ios.automationName,
                    platformVersion: config.appiumOptions.local.ios.platformVersion,
                    iosInstallPause: config.appiumOptions.local.ios.installPause,
                    app: config.appiumOptions.local.ios.appPath
                }, config.appiumOptions.capabilities.ios);
            case 'android':
                return _extends({
                    platformName: 'Android',
                    deviceName: config.appiumOptions.local.android.deviceName,
                    app: config.appiumOptions.local.android.appPath
                }, config.appiumOptions.capabilities.android);
        }
    },
    get userInfo() {
        switch (process.env.E2E_PLATFORM) {
            case 'saucelabs':
                return config.appiumOptions.saucelabs.userInfo;
            default:
                return config.appiumOptions.local.userInfo;
        }
    }
};

exports.default = wdConfig;