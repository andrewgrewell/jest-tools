import { PNG } from 'pngjs';
import ensureBaselineExists from './ensureBaselineExists';
import parseScreenshot from './parseScreenshot';
import writeResults from './writeScreenCheckResults';
import writeScreenshot from './writeScreenshot';
import removeScreenshot from './removeScreenshot';
import writeScreenshotDiff from './writeScreenshotDiff';
import getScreenshotsPixelDiff from './getScreenshotsPixelDiff';
import config from '../config';


export default async function compareScreenshots(driver, opts) {
    opts = Object.assign({}, config.screenCheckerOptions, opts);
    let baselineExists = await ensureBaselineExists(opts.name);
    let screenshot = await driver.takeScreenshot();
    if (!baselineExists) {
        await writeScreenshot(opts.name, 'baseline', screenshot);
        await writeResults({
            ...opts,
            pxDiff: 0,
            percentDiff: 0,
            status: 'skipped'
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
    if (percentDiff > opts.failThreshold) {
        await writeScreenshotDiff(opts.name, diff);
        await writeResults({
            ...baseResults,
            status: 'fail'
        });
        return false;
    }
    else if (percentDiff > opts.warnThreshold) {
        await writeScreenshotDiff(opts.name, diff);
        await writeResults({
            ...baseResults,
            status: 'warn'
        });
        return true;
    }
    removeScreenshot(opts.name, 'latest');
    await writeResults({
        ...baseResults,
        status: 'pass'
    });
    return true;
}