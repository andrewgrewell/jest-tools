import wd from 'wd';
import wdConfig from './wd.config';
import ScreenChecker from './screen-checker';
import config from './config';

const driver = wd.promiseChainRemote(wdConfig.url, wdConfig.port);
const defaultOpts = config.testOptions;


global.describeAutomation = (suiteName, testSuite, opts) => {
    describe(suiteName, () => {
        opts = { ...defaultOpts, ...opts };
        jest.setTimeout(opts.automationTimeout);

        beforeAll(async () => {
            try {
                console.log('Configuring Appium with: ', wdConfig.device);
                await driver.init(wdConfig.device);
            }
            catch (err) {
                console.error('Error Initializing Driver', err);
                let error = JSON.parse(err.data);
                error && console.error(error.value.message);
            }
            await driver.setImplicitWaitTimeout(opts.waitTimeout);
        });

        if (opts.resetAfterEach) {
            beforeEach(async () => await driver.resetApp());
        }

        if (!opts.remainOpenAfterRunning) {
            afterAll(async () => await driver.quit());
        }

        testSuite(driver, { screenChecker: new ScreenChecker(driver) });
    });
};