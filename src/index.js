#!/usr/bin/env node

var yargs = require("yargs");
import {init} from './controllers/index'

var args = yargs
    .command({
        command: "init <platform>",
        desc: "init miniprogram",
        builder: {},
        handler: argv => init(argv)
    })
    .version() // Use package.json's version
    .help()
    .alias({
        "h": "help",
        "v": "version"
    })
    .strict(true)
    .demandCommand()
    .argv;
