import sleep from '../util/sleep';
import compareScreenshots from './compareScreenshots';


class ScreenChecker {
    constructor(driver) {
        this.driver = driver;
    }

    _reset() {
        this.nextWaitMs = null;
        this.nextWaitForElement = null;
    }

    waitMs(ms) {
        this.nextWaitMs = ms;
        return this;
    }

    waitForElement(accessibilityLabel) {
        this.nextWaitForElement = accessibilityLabel;
        return this;
    }

    checkScreen(name, opts) {
        test(`[ScreenChecker] ${name} looks as expected`, async () => {
            if (this.nextWaitForElement) {
                await this.driver.waitForElementByAccessibilityId(this.nextWaitForElement);
            }
            await sleep(this.nextWaitMs || 0);
            let passed = await compareScreenshots(this.driver, { name: name, ...opts });
            expect(passed).toBe(true);
            this._reset();
        });
    }
}

export default ScreenChecker;