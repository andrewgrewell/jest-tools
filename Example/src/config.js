const fs = require('fs');
const path = require('path');

let consumerConfig = {};
try {
    consumerConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'jesttools.config.json'), 'utf8'));
}
catch (err) {
    // no config
}

const defaultScreenCheckerOptions = {
    warnThreshold: 0.001,
    failThreshold: 0.005,
    screenshotSensitivity: 0.1
};

const defaultReporterOptions = {};


module.exports = {
    outputPath: consumerConfig.outputPath || path.resolve(process.cwd(), './jesttools'),
    reporterOptions: Object.assign({}, defaultReporterOptions, consumerConfig.reporterOptions || {}),
    screenCheckerOptions: Object.assign({}, defaultScreenCheckerOptions, consumerConfig.screenCheckerOptions || {})
};