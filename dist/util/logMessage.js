'use strict';

function logMessage(message, type) {
    var logTypes = {
        default: '',
        warn: '\x1b[33m',
        success: '\x1b[32m%s\x1b[0m',
        error: '\x1b[31m%s\x1b[0m'
    };
    var logColor = logTypes[type];
    var logMsg = '' + message;
    if (!logColor) {
        console.log(logMsg);
    } else {
        console.log(logColor, logMsg);
    }
}

module.exports = logMessage;