import path from 'path';
import config from '../config';

export default function getScreenshotPath(name, type) {
    return `${path.resolve(config.outputPath)}/screenshots/${name}/${type}.png`;
}