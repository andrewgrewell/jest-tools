import fs from 'fs';
import getScreenshotPath from './getScreenshotPath';


export default function writeScreenshotDiff(name, diff) {
    return new Promise((resolve, reject) => {
        let stream = fs.createWriteStream(getScreenshotPath(name, 'diff'));
        diff.pack().pipe(stream);
        stream.on('finish', resolve);
        stream.on('error', reject);
    });
}