import path from 'path';
import writeFile from '../util/writeFile';
import config from '../config';


export default function writeScreenCheckResults(result) {
    return new Promise((resolve, reject) => {
        writeFile(path.resolve(config.outputPath, `./results/${result.name}/results.json`), JSON.stringify(result, null, 4))
            .then(resolve)
            .catch(reject);
    });
}