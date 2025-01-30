const chalk = require('chalk');

//! UTILS and CONSTANTS!
const VERSION = '0.3.0';
const DEFAULT_PROJ_FILE = 'pichProj.txt';
const DEFAULT_LANGUAGE_FILE = {
    'js': 'app.js',
    'ts': 'app.ts',
    'py': 'main.py',
    'java': 'main.java',
    'go': 'main.go',
    'cpp': 'main.cpp',
    'cs': 'main.cs',
    'test': 'test.js'
};
const SEPERATOR = '+=============================================+';

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function start() {
    console.log(chalk.green(` ________   ___   ________   ___  ___     \n|\\   __  \\ |\\  \\ |\\   ____\\ |\\  \\|\\  \\    \n\\ \\  \\|\\  \\\\ \\  \\\\ \\  \\___| \\ \\  \\\\\\  \\   \n \\ \\   ____\\\\ \\  \\\\ \\  \\     \\ \\   __  \\  \n  \\ \\  \\___| \\ \\  \\\\ \\  \\____ \\ \\  \\ \\  \\ \n   \\ \\__\\     \\ \\__\\\\ \\_______\\\\ \\__\\ \\__\\\n    \\|__|      \\|__| \\|_______| \\|__|\\|__| v${VERSION}\n`));
    console.log(chalk.greenBright(`* Type 'help' for get all commands`))
}

module.exports = { VERSION, DEFAULT_PROJ_FILE, DEFAULT_LANGUAGE_FILE, SEPERATOR, randomInt, start };