import pixelmatch from 'pixelmatch';


export default function getScreenshotsPixelDiff(baseline, latest, diff, opts) {
    return pixelmatch(
        baseline.data,
        latest.data,
        diff.data,
        baseline.width,
        baseline.height,
        {
            threshold: opts.threshold
        }
    );
}