const fs = require('fs');
const dirname = require('path').dirname;
const makeDirectory = require('./makeDirectory');


function writeFile(filePath, contents, opts) {
    return new Promise((resolve, reject) => {
        makeDirectory(dirname(filePath))
            .then(() => {
                fs.writeFile(filePath, contents, opts, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(filePath);
                });
            })
            .catch(reject);
    });
}


module.exports = writeFile;