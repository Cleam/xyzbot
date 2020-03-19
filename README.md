# XYZBOT

Saving and scraping a website with Puppeteer. From [this article](https://fettblog.eu/scraping-with-puppeteer/)

## Usage

```bash
# install
$ npm install --global xyzbot

# start fetch and will fetch resources to the "output" dir.
$ xyzbot -u https://example.com

# help
Usage: xyzbot [options]

Options:
  -v, --VERSION                     output the version number
  -u, --url <string>                [required] website url you want to fetch
  -wtc, --wait-time-close <number>  [optional] wait time to close the browser when fetching, default 30s
  -h, --help                        display help for command
```
