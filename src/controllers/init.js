const config = require('../config')
const util = require('../utils')
const inquirer = require('inquirer');

const promtList = [{
        type: 'input',
        message: '请输入git账号',
        name: 'user', 
        filter: function (val) { // 使用filter将回答变为小写
            return encodeURIComponent(val.toLowerCase())
        },
        default: 'rbyao@163.com'// 'golan.yao'
    },
    {
        type: 'password',
        message: '请输入git密码',
        name: 'pwd',
        filter: function (val) { 
            return encodeURIComponent(val)
        },
        default: 'i3Golagi12Q' // 'Etocrm@1929'
    }]


/**
 * 初始化aio项目命令
 * @param {*} argv
 */
function init(argv) {
    const { platform = 'weixin' } = argv;
    const { protocol, url, branch } = config[platform];
    if(!url) {
        util.error('指令错误')
    } 
    util.logo()
        .then(() => {
            util.success('\n欢迎使用小程序cli工具，即将初始化项目\n')
            return inquirer.prompt(promtList)
        })
        .then(obj => {
            util.loading('zerone initing...').start();
            return util.clone(protocol,url, branch, obj.user, obj.pwd)
        }).then(res => {
            util.loading().stop();
            util.log('项目初始化完成，开始预编译', res)
        }).catch(err => {
            util.log('项目初始化失败：' + err)
        });
}

export default init;