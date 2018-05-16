

describeAutomation('Critical Path', (driver, { screenChecker }) => {
    test('can switch pages', async () => {
        let link = await driver.waitForElementByAccessibilityId('navigationLink:2');
        await link.click();
    });

    screenChecker
        .waitForElement('screenTwo')
        .checkScreen('ScreenTwo');

    test('can switch pages', async () => {
        let link = await driver.waitForElementByAccessibilityId('navigationLink:3');
        await link.click();
    });

    test('can switch pages', async () => {
        let link = await driver.waitForElementByAccessibilityId('navigationLink:1');
        await link.click();
    });
});