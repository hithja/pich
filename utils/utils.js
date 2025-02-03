const chalk = require('chalk');
const os = require('os');
const { success, denied } = require('./output.js');

//! UTILS and CONSTANTS!
const VERSION = '0.4.5';
const PICH_DEFAULT_SETTINGS_WIN = `C:\\Users\\${os.userInfo()['username']}\\pich`;
const DEFAULT_PROJ = '.pproj';
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
    success(`* Type 'help' for get all commands`);
}

function help() {
    console.log(chalk.blue(`\n\t\t\t+==={All Commands in v${VERSION}}===+`));
    // +======+
    console.log(chalk.green(' - exit') + ' — Quits from program');
    console.log(SEPERATOR);
    // +======+
    console.log(chalk.green(' - project') + ' — Command for working with directories');
    console.log(chalk.green('   - dir {arg}') + '— Changes the directory to the directory specified in the argument');
    console.log(chalk.green('   - ls {arg}') + ' — Displays all files and directories in the current directory. The argument must be a number');
    console.log(chalk.green('   - create {arg}') + ' — Creates a new project in current directory. If no argument is given, the project name will be random');
    console.log(chalk.green('   - add {arg}') + ' — Creates a project from a directory');
    console.log(chalk.green('   - open {arg}') + ' — Outputs information about project');
    console.log(SEPERATOR);
    // +======+
    console.log(chalk.green(' - cat') + ' — Command for working with categories');
    console.log(chalk.green('   - ls') + ' — Lists all categories and values');
    console.log(chalk.green('   - add {arg}{arg}') + ' — Adds a value to exist category');
    console.log(chalk.green('   - create {arg}') + ' — Creates a new category');
    console.log(chalk.green('   - open {arg}{arg}') + ' — Changes the directory to the directory specified in the categories');
    console.log(chalk.green('   - delete {arg}') + ' — Deletes category');            
    console.log(SEPERATOR);
    console.log(chalk.blueBright(`* PiHC (v${VERSION}) by hithja.`));
}

module.exports = { VERSION, PICH_DEFAULT_SETTINGS_WIN, DEFAULT_PROJ, DEFAULT_LANGUAGE_FILE, SEPERATOR, randomInt, start, help };