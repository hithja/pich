const prompt = require("prompt-sync")({ sigint: true });
const path = require("path");
const fs = require('fs');
const chalk = require('chalk');
const utils = require('./utils/utils.js');
const cmd = require('./utils/cmd.js');

utils.start();

while (true) {
    let currDir = path.basename(process.cwd());
    let input = prompt(`[${currDir}] > `);
    cmd.commands(input);
} 