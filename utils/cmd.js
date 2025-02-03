const prompt = require("prompt-sync")({ sigint: true });
const path = require("path");
const fs = require('fs');
const { PICH_DEFAULT_SETTINGS_WIN, DEFAULT_PROJ, randomInt, help } = require('./utils.js');
const { success, denied } = require('./output.js');
const { defineLanguage, createFile } = require('./plUtil.js');

function commands(input) {
    let [cmd, ...arg] = input.split(' ');

    switch (cmd) {
        // Help command
        case 'help':
            help();
            break;
        
        case 'project':
            // Change directory
            if (arg[0] == 'dir') {
                if (arg[1]) {
                    if (fs.existsSync(arg[1])) {
                        process.chdir(arg[1]);
                    }
                    else {
                        success('* This directory doesn\'t exist!');
                        break;
                    }
                }
                else {
                    denied('* Path hasn\'t given!');
                    break;
                }
            }
            // List
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
                        fs.appendFileSync(`${arg[1]}/${arg[1]}${DEFAULT_PROJ}`, `${keywords.join(' ')}/${language}`);
                        createFile(arg[1], defineLanguage(language));
                        success('* Created!');
                    }
                    else {
                        denied('* A project with this name exists!');
                    }
                }
                else {
                    let dir = 'project' + randomInt(10000, 99999);
                    let language = prompt('[PROGRAMMING LANGUAGE] > ');
                    let [...keywords] = prompt('[TYPE KEYWORDS] > ').split(/[\s,]+/);

                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                        fs.appendFileSync(`${dir}/${dir}${DEFAULT_PROJ}`, `${keywords.join(' ')}/${language}`);
                        createFile(dir, defineLanguage(language));
                        success('* Created!');
                    }
                }
            }
            // Opening project
            else if (arg[0] == 'open') {
                if (arg[1]) {
                    try {
                        if (fs.existsSync(`${arg[1]}/${arg[1]}${DEFAULT_PROJ}`)) {
                            let fd = fs.openSync(`${arg[1]}/${arg[1]}${DEFAULT_PROJ}`);
                            let str = fs.readFileSync(fd, 'utf-8');
                            success(`* Opened!\nKeywords: ${str.split('/')[0]}\nLanguage: ${str.split('/')[1]}`);
                            let yn = prompt(`* Do you want to open '${arg[1]}' in explorer (y/n)? `);
                            if ((yn.toLowerCase() == 'y') || (yn.toLowerCase() == 'yes')) require('child_process').exec(`start "" "${arg[1]}"`);
                        }
                        else {
                            denied(`* This directory isn\'t a project or the file '${arg[1]}/${arg[1]}${DEFAULT_PROJ}' was corrupted!`);
                        }
                    } catch (e) {
                        denied(e.message);
                    }
                }
                else {
                    denied('* Project hasn\'t opened!');
                }
            }
            // Adding project 
            //? require('child_process').exec('start "" "c:\\test"');
            else if (arg[0] == 'add') {
                if (arg[1]) {
                    if (fs.existsSync(`${arg[1]}`)) {
                        if (!fs.existsSync(`${arg[1]}/${arg[1]}${DEFAULT_PROJ}`)) {
                            let language = prompt('[PROGRAMMING LANGUAGE] > ');
                            let [...keywords] = prompt('[TYPE KEYWORDS] > ').split(/[\s,]+/);
                            fs.appendFileSync(`${arg[1]}/${arg[1]}${DEFAULT_PROJ}`, `${keywords.join(' ')}/${language}`);
                            createFile(arg[1], defineLanguage(language));
                            success('* Created!');
                        }
                        else {
                            denied(`* ${arg[1]} already is project, fool!`);
                        }
                    }
                    else {
                        denied(`* ${arg[1]} doesn't exist!`);
                    }
                }
                else {
                    denied('Argument hasn\'t given!');
                }
            }
            else {
                denied('* Invalid argument! Input \'help\' for get help');
            }
            break;
        
        // Categories
        case 'cat':
            // List categories
            if (arg[0] == 'ls') {
                if (fs.existsSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`)) {
                    if (arg[1]) {
                        let fd = fs.openSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`);
                        let str = fs.readFileSync(fd, 'utf-8');
                        let parsedStr = JSON.parse(str);
                        
                        if (parsedStr['cat'][arg[1]] !== undefined) {
                            console.log(`${parsedStr['cat'][arg[1]]}`);
                        }
                        else {
                            denied(`* Category '${arg[1]}' doesn't exist!`);
                        }
                    }
                    else {
                        let fd = fs.openSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`);
                        let str = fs.readFileSync(fd, 'utf-8');
                        let parsedStr = JSON.parse(str);
                        
                        for (let key in parsedStr['cat']) {
                            console.log(`* ┏ ${key}:`);
                            for (let i = 0; i < parsedStr['cat'][key].length; i++) {
                                console.log(`  ┠ ${path.basename(parsedStr['cat'][key][i])} — ${i}`);
                            }
                        }
                    }
                }
                else {
                    denied(`* File ${PICH_DEFAULT_SETTINGS_WIN}\\cat.json doesn't exist! Reopen program or create it.`);
                }
            }
            // Add element to category
            else if (arg[0] == 'add') {
                if (arg[1]) {
                    if (fs.existsSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`)) {
                        let fd = fs.openSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`);
                        let str = fs.readFileSync(fd, 'utf-8');
                        let parsedStr = JSON.parse(str);

                        if (parsedStr['cat'][arg[1]]) {
                            parsedStr['cat'][arg[1]].push(process.cwd());
                            fs.writeFileSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`, JSON.stringify(parsedStr));
                            success(`* ${path.basename(process.cwd())} was successfully added to ${arg[1]}`);
                        }
                        else {
                            denied(`* Category ${arg[1]} hasn't found! Try to use 'cat create {arg}' to create new category.`);
                        }
                    }
                    else {
                        denied(`* File ${PICH_DEFAULT_SETTINGS_WIN}\\cat.json doesn't exist! Reopen program or create it.`);
                    }
                }
                else {
                    denied('* Not enough arguments!');
                }

            }
            // Create category
            else if (arg[0] == 'create') {
                if (fs.existsSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`)) {
                    let fd = fs.openSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`);
                    let str = fs.readFileSync(fd, 'utf-8');
                    let parsedStr = JSON.parse(str);
                    if (arg[1]) {
                        parsedStr['cat'][arg[1]] = [];
                        fs.writeFileSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`, JSON.stringify(parsedStr));
                        success(`* ${arg[1]} created!`);
                    }
                    else {
                        denied(`* Argument hasn't given!`);
                    }
                }
                else {
                    denied('* Category hasn\'t given!');
                }
            }
            // Open category
            else if (arg[0] == 'open') {
                if (fs.existsSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`)) {
                    let fd = fs.openSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`);
                    let str = fs.readFileSync(fd, 'utf-8');
                    let parsedStr = JSON.parse(str);
                    if (arg[1] && arg[2] && parsedStr['cat'][arg[1]]) {
                        if (arg[2] < parsedStr['cat'][arg[1]].length) {
                            process.chdir(parsedStr['cat'][arg[1]][arg[2]]);
                        }
                        else {
                            denied(`* The second argument must be a number from 0 to ${parsedStr['cat'][arg[1]].length-1}!`);
                        }
                    }
                    else {
                        denied(`* Argument is invalid!`);
                    }
                }
                else {
                    denied('* Category hasn\'t given!');
                }
            }
            // Delete category
            else if (arg[0] == 'delete') {
                if (fs.existsSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`)) {
                    let fd = fs.openSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`);
                    let str = fs.readFileSync(fd, 'utf-8');
                    let parsedStr = JSON.parse(str);
                    if (arg[1]) {
                        delete parsedStr['cat'][arg[1]];
                        fs.writeFileSync(`${PICH_DEFAULT_SETTINGS_WIN}/cat.json`, JSON.stringify(parsedStr));
                        success(`* ${arg[1]} deleted!`);
                    }
                    else {
                        denied(`* Argument hasn't given!`);
                    }
                }
                else {
                    denied('* Category hasn\'t given!');
                }
            }
            else {
                denied('* Invalid argument! Input \'help\' for get help');
            }
            break;
        
        case 'exit':
            process.exit(0);
            break;
        
        default:
            denied('* Unknown command! Input \'help\' for get help');
            break;
    }
}

module.exports = {commands};