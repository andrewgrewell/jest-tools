const recursive = require('recursive-readdir');


function readDirectoryFiles(rootPath, ignore = []) {
    ignore = Array.isArray(ignore) ? ignore : [ignore];

    return new Promise((resolve, reject) => {
        recursive(rootPath, ignore, (err, files) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        });

    });
}

module.exports = readDirectoryFiles;