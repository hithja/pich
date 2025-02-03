const prompt = require("prompt-sync")({ sigint: true });
const path = require("path");
const fs = require('fs');
const chalk = require('chalk');
const utils = require('./utils/utils.js');
const cmd = require('./utils/cmd.js');

utils.start();

// PiCH settings directory
if (!fs.existsSync(utils.PICH_DEFAULT_SETTINGS_WIN)) {
    fs.mkdirSync(utils.PICH_DEFAULT_SETTINGS_WIN);
}
if (!fs.existsSync(`${utils.PICH_DEFAULT_SETTINGS_WIN}/cat.json`)) {
    fs.appendFileSync(`${utils.PICH_DEFAULT_SETTINGS_WIN}/cat.json`, '{ "a": ["javascript"] }');
}

while (true) {
    let currDir = path.basename(process.cwd());
    let input = prompt(`[${currDir}] > `);
    cmd.commands(input);
} 