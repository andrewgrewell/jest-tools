import fs from 'fs';
import getScreenshotPath from './getScreenshotPath';

export default function removeScreenshot(name, type) {
    return new Promise((resolve, reject) => {
        fs.unlink(getScreenshotPath(name, type), (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}