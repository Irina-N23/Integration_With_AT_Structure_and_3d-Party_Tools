"use strict";

const {After, setDefaultTimeout} = require("cucumber");
setDefaultTimeout(60 * 1000);

After(async function() {
    const screenshot = await browser.takeScreenshot();
    const decodedImage = new Buffer.from(screenshot, "base64");
    return this.attach(decodedImage, "image/png");
});