const chalk = require('chalk');
const loading = require('loading-cli');
const LOAD = loading({
    text: '',
    color: 'green',
    frames: ['🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘']
})
const WARN_COLOR = '#FFA07A';
const ARR_LOGO = [
    '███████╗███████╗██████╗  ██████╗ ███╗   ██╗███████╗',
    '╚══███╔╝██╔════╝██╔══██╗██╔═══██╗████╗  ██║██╔════╝',
    '  ███╔╝ █████╗  ██████╔╝██║   ██║██╔██╗ ██║█████╗  ',
    ' ███╔╝  ██╔══╝  ██╔══██╗██║   ██║██║╚██╗██║██╔══╝  ',
    '███████╗███████╗██║  ██║╚██████╔╝██║ ╚████║███████╗',
    '╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝'
    ];
module.exports = { 
    logo: function() {
        return new Promise(r => {
            let t = 0;
            ARR_LOGO.forEach((ele, i) => {
                setTimeout(() => {
                    console.log(chalk.hex(WARN_COLOR).bold(ele))
                    if(i === ARR_LOGO.length - 1) r();
                }, t);
                t+= 100;
            }) 
        })
    },
    loading: function(str) {
        str && (LOAD.text = str);
        return LOAD;
    },
    log: function(str) {
        str && console.log(str);
    },
    warn: function(str) {
        str && console.log(chalk.hex(WARN_COLOR)(str));
    },
    success: function(str) {
        str && console.log(chalk.green(str));
    },
    error: function(str) {
        str && console.log(chalk.red(str));
    },
    link: function(str) {
        str && console.log(chalk.underline.blue(str));
    }
}