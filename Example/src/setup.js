import wd from 'wd';
import e2eConfig from './e2e.config';
import ScreenChecker from './screen-checker';
import config from './config';
const driver = wd.promiseChainRemote(e2eConfig.url, e2eConfig.port);

const defaultOpts = Object.assign({
    automationTimeout: 60000,
    waitTimeout: 10000,
    resetAfterEach: false,
    remainOpenAfterRunning: false
}, config);


global.describeAutomation = (suiteName, testSuite, opts) => {
    describe(suiteName, () => {
        opts = { ...defaultOpts, ...opts };
        jest.setTimeout(opts.automationTimeout);

        beforeAll(async () => {
            await driver.init(e2eConfig.device);
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