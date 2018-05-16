const fs = require('fs');
const dirname = require('path').dirname;
const makeDirectory = require('./makeDirectory');


function writeFile(filePath, contents, opts) {
    console.log('write file:', filePath);
    return new Promise((resolve, reject) => {
        makeDirectory(dirname(filePath))
            .then(() => {
                fs.writeFile(filePath, JSON.stringify(contents, null, 2), opts, (err) => {
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