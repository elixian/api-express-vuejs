const winston = require('winston');
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, prettyPrint } = format;
require('express-async-errors');
module.exports = function () {
    winston.exceptions.handle(
       new winston.transports.Console({colorize:true, prettyPrint: true}),
       new winston.transports.File({filename: 'uncaughtExceptions.log'}),
       
    );

    process.on('unhandledRejection', (ex) => {
        console.log('UNHANDLEREJECTION');
        winston.error(ex.message, ex);
    })
    process.on('uncaughtException', (ex) => {
        console.log('UNCAUGHTEXCEPTION');
        winston.error(ex.message, ex);
    });
    

    winston.add(new winston.transports.File({
        filename: 'logfile.log'
    }));
    
   winston.add( new transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.prettyPrint(),
          winston.format.simple()
        )
      }));
}