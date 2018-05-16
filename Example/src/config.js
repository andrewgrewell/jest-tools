const fs = require('fs');
const path = require('path');

let consumerConfig = {};
try {
    consumerConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'jestdeluxe.config.json'), 'utf8'));
}
catch (err) {
    // no config
}

module.exports = {
    outputPath: consumerConfig.outputPath || path.resolve(process.cwd(), './jestdeluxe'),
    reporterOptions: consumerConfig.reporterOptions || {},
    screenCheckerOptions: consumerConfig.screenCheckerOptions || {}
};