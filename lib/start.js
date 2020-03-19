/**
 * from: https://fettblog.eu/scraping-with-puppeteer/
 */

const puppeteer = require('puppeteer'); // v 1.1.0
const { URL } = require('url');
const fse = require('fs-extra'); // v 5.0.0
const path = require('path');

const chalk = require('chalk');
const ora = require('ora');

// function log(txt, color = 'green') {
//   console.log(chalk[color](txt));
// }

/**
 * start fetch the url
 * @param {string} urlToFetch fetch url
 * @param {number} waitTimeToClose wait time(seconds) for browser.close(), default: 10s
 */
async function start(urlToFetch, waitTimeToClose = 10) {
  /* 1 */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const host = new URL(urlToFetch).host;

  /* 2 */
  page.on('response', async response => {
    const url = new URL(response.url());
    let filePath = path.resolve(`./output/${host}${url.pathname}`);
    if (path.extname(url.pathname).trim() === '') {
      filePath = `${filePath}/index.html`;
    }
    try {
      await fse.outputFile(filePath, await response.buffer());
    } catch (error) {
      // throw error;
    }
  });

  /* 3 */
  await page.goto(urlToFetch, {
    waitUntil: 'networkidle2'
  });

  /* 4 */
  setTimeout(async () => {
    await browser.close();
  }, waitTimeToClose * 1000);
}

// start('https://www.baidu.com');
// start(
//   'https://sf3-ttcdn-tos.pstatp.com/obj/union-fe/playable/632cf5e4d2d922e597c73307342253ea/index.html'
// );

module.exports = async (urlToFetch, waitTimeToClose) => {
  const progress = ora();
  progress.start(chalk.green('fetching...'));
  await start(urlToFetch, waitTimeToClose).catch(err => {
    progress.fail(chalk.red(err));
    process.exit(1);
  });
  progress.succeed(chalk.green('succeed!'));
};
