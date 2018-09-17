"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getScreenshotTotalPixels;
function getScreenshotTotalPixels(screenshot) {
    return screenshot.width * screenshot.height;
}