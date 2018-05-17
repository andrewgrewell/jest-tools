import writeFile from '../util/writeFile';
import path from 'path';
import getScreenshotPath from './getScreenshotPath';


export default async function writeScreenshot(name, type, content) {
    return writeFile(path.resolve(getScreenshotPath(name, type)), content, 'base64');
}