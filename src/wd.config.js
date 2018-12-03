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
        const platform = process.env.E2E_PLATFORM;
        const opts = config.appiumOptions.local[platform];
        switch (platform) {
            case 'ios': return {
                platformName: 'iOS',
                ...opts
            };
            case 'android': return {
                platformName: 'Android',
                ...opts
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