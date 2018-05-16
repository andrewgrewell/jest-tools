import fs from 'fs';


export default function ensureScreenshotsExists(screenshotDir) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(screenshotDir)) {
            resolve(true);
        }
        resolve(false);
    });
}