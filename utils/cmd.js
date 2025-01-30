const prompt = require("prompt-sync")({ sigint: true });
const path = require("path");
const fs = require('fs');
const chalk = require('chalk');
const { VERSION, DEFAULT_PROJ_FILE, SEPERATOR, randomInt } = require('./utils.js');
const { defineLanguage, createFile } = require('./plUtil.js');

function commands(input) {
    let [cmd, ...arg] = input.split(' ');

    switch (cmd) {
        // Help command
        case 'help':
            console.log(chalk.blue(`\n\t\t\t+==={All Commands in v${VERSION}}===+`));
            // Exit command
            console.log(chalk.green(' - exit') + ' — Quits from program');
            console.log(SEPERATOR);
            // Project cmd tutor
            console.log(chalk.green(' - project') + ' — Command for working with directories');
            console.log(chalk.green('   - dir {arg}') + '— Changes the directory to the directory specified in the argument');
            console.log(chalk.green('   - ls {arg}') + ' — Displays all files and directories in the current directory. The argument must be a number');
            console.log(chalk.green('   - create {arg}') + ' — Creating a new project in current directory. If no argument is given, the project name will be random');
            console.log(chalk.green('   - open {arg}') + ' — Outputs information about project');
            console.log(SEPERATOR);
            console.log(chalk.blueBright(`* PiHC (v${VERSION}) by hithja.`));
            break;
        
        case 'project':
            // Change directory param
            if (arg[0] == 'dir') {
                if (arg[1]) {
                    if (fs.existsSync(arg[1])) {
                        process.chdir(arg[1]);
                    }
                    else {
                        console.log(chalk.redBright('* This directory doesn\'t exist!'));
                        break;
                    }
                }
                else {
                    console.log(chalk.redBright('* Path hasn\'t given!'));
                    break;
                }
            }
            // List param
            else if (arg[0] == 'ls') {
                let files = fs.readdirSync('.');
                if (!isNaN(arg[1])) {
                    for (let i = 0; i < arg[1]; i++) {
                        console.log(`\t- ${files[i]}`); 
                    }
                }
                else {
                    for (let i = 0; i < files.length; i++) {
                        console.log(`\t- ${files[i]}`); 
                    }
                }
            }
            // Creating project
            else if (arg[0] == 'create') {
                if (arg[1]) {
                    if (!fs.existsSync(arg[1])) {
                        let language = prompt('[PROGRAMMING LANGUAGE] > ');
                        let [...keywords] = prompt('[TYPE KEYWORDS] > ').split(',');

                        fs.mkdirSync(arg[1]);
                        fs.appendFileSync(`${arg[1]}/${DEFAULT_PROJ_FILE}`, `${keywords.join(' ')}/${language}`);
                        createFile(arg[1], defineLanguage(language));
                        console.log(chalk.greenBright('* Created!'));
                    }
                    else {
                        console.log(chalk.redBright('* A project with this name exists!'));
                    }
                }
                else {
                    let dir = 'project' + randomInt(10000, 99999);
                    let language = prompt('[PROGRAMMING LANGUAGE] > ');
                    let [...keywords] = prompt('[TYPE KEYWORDS] > ').split(/[\s,]+/);

                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                        fs.appendFileSync(`${dir}/${DEFAULT_PROJ_FILE}`, `${keywords.join(' ')}/${language}`);
                        createFile(dir, defineLanguage(language));
                        console.log(chalk.greenBright('* Created!'));
                    }
                }
            }
            // Opening project (indev)
            else if (arg[0] == 'open') {
                if (arg[1]) {
                    try {
                        if (fs.existsSync(`${arg[1]}/${DEFAULT_PROJ_FILE}`)) {
                            let fd = fs.openSync(`${arg[1]}/${DEFAULT_PROJ_FILE}`);
                            let str = fs.readFileSync(fd, 'utf-8');
                            console.log(chalk.greenBright(`* Opened!\nKeywords: ${str.split('/')[0]}\nLanguage: ${str.split('/')[1]}`));
                        }
                        else {
                            console.log(chalk.redBright('* This directory isn\'t a project or the file \'pichProj.txt\' was corrupted!'));
                        }
                    } catch (e) {
                        console.log(chalk.red(e.message));
                    }
                }
                else {
                    console.log(chalk.redBright('* No project was opened!'));
                }
            }
            else {
                console.log(chalk.redBright('* Invalid argument! Input \'help\' for get help'));
            }
            break;
        
        case 'test':
            console.log(chalk.greenBright('* Hello, World!'));
            break;
        
        case 'exit':
            process.exit(0);
            break;
        
        default:
            console.log(chalk.redBright('* Unknown command! Input \'help\' for get help'));
            break;
    }
}

module.exports = {commands};