import fs from 'fs';
import getScreenshotPath from './getScreenshotPath';


export default function ensureScreenshotsExists(name) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(getScreenshotPath(name, 'baseline'))) {
            resolve(true);
        }
        resolve(false);
    });
}