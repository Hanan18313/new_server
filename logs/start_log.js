var log4js = require('log4js');
//log4js.configure(log4js_config)
log4js.configure({
    appenders:{
        xcLogFile:{
            type:'dateFile',
            filename:__dirname+'/logs_file/logs',
            alwaysIncludePattern:true,
            pattern:'-yyyy-MM-dd.log',
            encoding:'utf-8',
            maxLogSize:'11024'
        },
        xcLogConsole:{
            type:'console'
        }
    },
    categories:{
        default:{
            appenders:['xcLogFile'],
            level:'all'
        },
        xcLogFile:{
            appenders:['xcLogFile'],
            level:'all'
        },
        xcLogConsole:{
            appenders:['xcLogConsole'],
            level:log4js.levels.ALL
        }
    }
})

module.exports = log4js