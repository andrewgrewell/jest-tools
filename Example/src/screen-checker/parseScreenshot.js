import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';
import config from '../config';


export default function parseScreenshot(name, type) {
    return new Promise((resolve, reject) => {
        let screenshotPath = path.resolve(config.outputPath, `./screenshots/${name}/${type}.png`);
        let screenshot = fs.createReadStream(screenshotPath).pipe(new PNG()).on('parsed', () => {
            resolve({
                data: screenshot.data,
                width: screenshot.width,
                height: screenshot.height,
                totalPx: screenshot.width * screenshot.height
            });
        });
    });
}