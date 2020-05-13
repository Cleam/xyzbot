#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();
const version = require('../package.json').version;

// 版本
program
  .version(version, '-v, --VERSION')
  .option('init', '初始化项目')
  .parse(process.argv);
