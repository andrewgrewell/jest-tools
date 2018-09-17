const mkdirp = require('mkdirp');


function makeDirectory(path) {
    return new Promise((resolve, reject) => {
        mkdirp(path, (err) => {
            if (err) {
                reject(err);
            }
            resolve(path);
        });
    });
}


module.exports = makeDirectory;