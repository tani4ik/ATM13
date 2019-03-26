"use strict";
const {After} = require('cucumber');
const { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);

After(function (testCase) {
    return browser.takeScreenshot().then((screenShot) => {
        let decodedImage = new Buffer(screenShot, 'base64');    
        return this.attach(decodedImage, 'image/png');
    });
});