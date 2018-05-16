import { PNG } from 'pngjs';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import ensureScreenshotsExists from './ensureScreenshotsExists';
import parseScreenshot from './parseScreenshot';
import getScreenshotPath from './getScreenshotPath';
import writeResults from './writeScreenCheckResults';
import writeScreenshot from './writeScreenshot';
import removeScreenshot from './removeScreenshot';
import writeScreenshotDiff from './writeScreenshotDiff';
import getScreenshotsPixelDiff from './getScreenshotsPixelDiff';

const defaultOpts = {
    warnThreshold: 0.001,
    failThreshold: 0.01,
    threshold: 0.1
};


export default async function compareScreenshots(driver, opts) {
    opts = Object.assign({}, defaultOpts, opts);
    let baselineExists = await ensureScreenshotsExists(opts.name);
    let screenshot = await driver.takeScreenshot();
    if (!baselineExists) {
        await writeScreenshot(opts.name, 'baseline', screenshot);
        await writeResults({
            ...opts,
            pxDiff: 0,
            percentDiff: 0,
            status: 'passed'
        });
        return true;
    }
    else {
        await writeScreenshot(opts.name, 'latest', screenshot);
    }
    let baseline = await parseScreenshot(opts.name, 'baseline');
    let latest = await parseScreenshot(opts.name, 'latest');
    let diff = new PNG({ width: baseline.width, height: baseline.height });
    let pxDiff = getScreenshotsPixelDiff(baseline, latest, diff, opts);
    let percentDiff = pxDiff / baseline.totalPx;
    let baseResults = {
        ...opts,
        pxDiff,
        percentDiff
    };
    if (percentDiff > opts.warnThreshold) {
        await writeResults({
            ...baseResults,
            status: 'warn'
        });
        return true;
    }
    if (percentDiff > (opts.failThreshold)) {
        await writeScreenshotDiff(opts.name, diff);
        await writeResults({
            ...baseResults,
            status: 'fail'
        });
        return false;
    }
    removeScreenshot(opts.name, 'latest');
    await writeResults({
        ...baseResults,
        status: 'pass'
    });
    return true;
}