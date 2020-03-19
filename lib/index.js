'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');

(async function main(urlToFetch) {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto(urlToFetch);

    const cdp = await page.target().createCDPSession();
    const { data } = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
    fs.writeFileSync('game.mhtml', data);

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();

module.exports = main;
