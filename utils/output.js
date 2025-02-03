const chalk = require('chalk');

// Error and success message functions
function success(text) {
    console.log(chalk.greenBright(text));
}
function denied(text) {
    console.log(chalk.redBright(text));
}

module.exports = { success, denied };