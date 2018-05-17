

describeAutomation('Critical Path', (driver, { screenChecker }) => {
    test('can navigate to page two', async () => {
        let link = await driver.waitForElementByAccessibilityId('navigationLink:2');
        await link.click();
    });

    screenChecker
        .waitForElement('screenTwo')
        .checkScreen('ScreenTwo');

    test('can navigate to page three', async () => {
        let link = await driver.waitForElementByAccessibilityId('navigationLink:3');
        await link.click();
    });

    screenChecker
        .waitMs(1000)
        .checkScreen('ScreenThree');

    test('can navigate to page one', async () => {
        let link = await driver.waitForElementByAccessibilityId('navigationLink:1');
        await link.click();
    });

    screenChecker
        .waitMs(1000)
        .checkScreen('ScreenOne');
});