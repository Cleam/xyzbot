'use strict';

const puppeteer = require('puppeteer');
const fs = require('fs');
// const mhtml2html = require('mhtml2html');

(async function main() {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto(
      'https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/playable/632cf5e4d2d922e597c73307342253ea/index.html'
    );

    const cdp = await page.target().createCDPSession();
    const { data } = await cdp.send('Page.captureSnapshot', { format: 'mhtml' });
    fs.writeFileSync('game.mhtml', data);
    // const html = mhtml2html.convert(data);
    // fs.writeFileSync('game.html', html);

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();
