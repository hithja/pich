const prompt = require("prompt-sync")({ sigint: true });
const path = require("path");
const fs = require('fs');
const { DEFAULT_LANGUAGE_FILE } = require('./utils.js');
const chalk = require("chalk");

function defineLanguage(defName) {
    switch (defName.toLowerCase()) {
        case 'javascript':
        case 'js':
            return 'js';
            break;

        case 'typescript':
        case 'ts':
            return 'ts';
            break;

        case 'python':
        case 'py':
            return 'py';
            break;

        case 'java':
            return 'java';
            break;

        case 'cpp':
        case 'c++':
            return 'cpp';
            break;

        case 'go':
        case 'golang':
            return 'go';
            break;

        case 'csharp':
        case 'cs':
        case 'c#':
            return 'cs';
            break;

        //! This language must be here! Without this language program won't start!
        case 'test':
            return 'test';
            break;
    
        default:
            return chalk.redBright(`* Unknown language: ${defName}! Please check the name!`);
    }
}

function createFile(dir, lang) {
    fs.appendFileSync(`${dir}/${DEFAULT_LANGUAGE_FILE[lang]}`, ` `);
}

module.exports = { defineLanguage, createFile };