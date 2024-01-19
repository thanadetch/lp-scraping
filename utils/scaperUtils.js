const {launch} = require("puppeteer");
const fs = require("fs");
const {username, password, imageBasePath, basePath} = require("./environmentUtils");
const axios = require("axios");

const account = {
    username: username,
    password: password
}

async function signIn() {
    // Launch a headless browser instance.
    const browser = await launch({
        headless: 'new'
    });

    const page = await browser.newPage();
    const acceptBeforeUnload = dialog =>
        dialog.type() === "beforeunload" && dialog.accept()
    ;
    page.on("dialog", acceptBeforeUnload);

    await page.setViewport({width: 1366, height: 768})

    await page.goto("https://propertyscout.co.th/");

    await page.waitForSelector('[data-testid="sign-in"]');
    await page.click('[data-testid="sign-in"]');

    await page.waitForSelector("input[name='email']");
    await page.type("input[name='email']", account.username);

    await page.waitForSelector('input[name="password"]');
    await page.type("input[name='password']", account.password);

    await page.click("[data-testid=submit]")

    await page.waitForSelector('[data-testid="auth-form"]', {hidden: true})
    console.log('Sign In Success')
    return {page, browser};
}

const getPageData = async (page, code) => {
    await page.goto(`https://propertyscout.co.th/en/edit/${code}/`, {waitUntil: 'networkidle2'});
    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML,
        };
    });
    return pageData.html
}

async function downloadImage(url, filename) {
    try {
        const response = await axios.get(url, {responseType: 'arraybuffer'});
        await fs.promises.writeFile(filename, response.data)
        console.error("Downloaded image", filename);
    } catch (e) {
        console.log(e)
        console.error("Error downloading image", filename)
    }
}

async function scrapeImages($, property) {
    const imageElements = $('div.w-full.h-full.bg-cover.rounded-lg');
    const imagePath = `${imageBasePath}/${property.name}_${property.lpCode}`;
    await fs.promises.mkdir(imagePath, {recursive: true});
    for (let i = 0; i < imageElements.length; i++) {
        const imageElement = imageElements[i];
        const cssCode = $(imageElement).css('background-image');
        const urlRegex = /url\(["']([^"']+)["']\)/;
        const match = cssCode.match(urlRegex);
        const fileExtension = match[1].match(/\.(\w+)$/)[1];
        const fileName = `${property.name}_${property.lpCode}_${i + 1}.${fileExtension}`;
        await downloadImage(match[1], `${imagePath}/${fileName}`)
    }
}

const cleanUp = async () => {
    await fs.promises.rm(basePath, {recursive: true, force: true})
    await fs.promises.mkdir(basePath, {recursive: true})
}

module.exports = {
    signIn,
    getPageData,
    scrapeImages,
    cleanUp
}
