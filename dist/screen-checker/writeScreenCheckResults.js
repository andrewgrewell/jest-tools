'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = writeScreenCheckResults;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _writeFile = require('../util/writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeScreenCheckResults(result) {
    return new Promise(function (resolve, reject) {
        (0, _writeFile2.default)(_path2.default.resolve(_config2.default.reporterOptions.outputPath, './results/' + result.name + '/results.json'), JSON.stringify(result, null, 4)).then(resolve).catch(reject);
    });
}