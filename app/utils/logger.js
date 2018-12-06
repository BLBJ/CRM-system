/**
 * @author JiangBing
 * @date 2018/2/8
 * @description
 */
let config = require("../config").logger;
const log4js = require('log4js');
const LEVEL = ["ALL", "TRACE", "DEBUG", "INFO", "WARN", "ERROR", "FATAL", "MARK", "OFF"];

log4js.configure({
    appenders: {
        console: {
            type: "console",
            layout: {
                type: 'pattern',
                pattern: '%[[%p] [%d{yyyy/MM/dd hh:mm:ss}] [ %m ]  %z %]'
            }
        },
        dateLog: {
            type: 'file',
            filename: config.filename,
            maxLogSize: 10485760,
            backups: 1,
            compress: true,
            layout: {
                type: 'pattern',
                pattern: '[%d{yyyy/MM/dd hh:mm:ss}] [%p]  [ %m ]  %z'
            }
        }
    },
    categories: {
        default: { appenders: [ 'dateLog', 'console' ], level: LEVEL[config.level]}
    }
});
let logger = log4js.getLogger();
process.on("exit", () => logger.fatal("程序退出，退出代码%d", process.exitCode));
module.exports = logger;