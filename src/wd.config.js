const config = require('./config');

const wdConfig = {
    get url() {
        switch (process.env.E2E_PLATFORM) {
            case 'saucelabs': return config.appiumOptions.saucelabs.url;
            default: return config.appiumOptions.local.url;
        }
    },
    get port() {
        switch (process.env.E2E_PLATFORM) {
            case 'saucelabs': return config.appiumOptions.saucelabs.port;
            default: return config.appiumOptions.local.port;
        }
    },
    get device() {
        switch (process.env.E2E_PLATFORM) {
            case 'ios': return {
                platformName: 'iOS',
                deviceName: config.appiumOptions.local.ios.deviceName,
                automationName: config.appiumOptions.local.ios.automationName,
                platformVersion: config.appiumOptions.local.ios.platformVersion,
                iosInstallPause: config.appiumOptions.local.ios.installPause,
                app: config.appiumOptions.local.ios.appPath,
                ...config.appiumOptions.ios.capabilities
            };
            case 'android': return {
                platformName: 'Android',
                deviceName: config.appiumOptions.local.android.deviceName,
                app: config.appiumOptions.local.android.appPath,
                ...config.appiumOptions.android.capabilities
            };
        }
    },
    get userInfo() {
        switch (process.env.E2E_PLATFORM) {
            case 'saucelabs': return config.appiumOptions.saucelabs.userInfo;
            default: return config.appiumOptions.local.userInfo
        }

    }
};


export default wdConfig;