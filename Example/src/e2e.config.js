//TODO this needs to be configured via a config file in the project or package.json
const e2eConfig = {
    get url() {
        switch (process.env.E2E_ENV) {
            case 'saucelabs': return 'add-sauce-labs-url';
            default: return 'localhost';
        }
    },
    get port() {
        switch (process.env.E2E_ENV) {
            case 'saucelabs': return 'add-sauce-labs-port';
            default: return 4723;
        }
    },
    get device() {
        switch (process.env.E2E_PLATFORM) {
            case 'ios': return {
                platformName: 'iOS',
                platformVersion: '11.2',
                deviceName: 'iPhone Simulator',
                automationName: 'XCUITest',
                iosInstallPause: 1000,
                // TODO setup fastlane to build simulator builds and place them in the e2e directory
                app: process.cwd() + '/ios/build/Build/Products/Debug-iphonesimulator/Example.app'
            };
            case 'android': return {
                platformName: 'Android',
                deviceName: 'Android Emulator',
                app: process.cwd() + '/android/app/build/outputs/apk/app-release.apk'
            };
        }
    },
    get userInfo() {
        switch (process.env.E2E_ENV) {
            case 'saucelabsl': return {};
            default: return {
                userId: 35,
                email: 'user35@provatahealth.com',
                password: 'Passw0rd'
            };
        }

    }
};


export default e2eConfig;