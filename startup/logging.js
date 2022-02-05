//
// Purpose: MANIBUS logging
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//


require('express-async-errors');
const winston = require('winston');
//require('winston-mongodb');



module.exports = function (app) {


// capture synch uncaught exceptions
process.on('uncaughtException', (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});
// capture async unhandled rejections
process.on('unhandledRejection', (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
});

// put log in file using winston
winston.add(new winston.transports.File({ filename: 'logfile.log' }));
if (app.get("env") === "development" || app.get("env") === "test") {
  winston.add(new winston.transports.Console);
}
// put log in Mongo using winston  (!! is causing deprec warning mongodb/mongoose)
//winston.add(new winston.transports.MongoDB({ db: config.get("db")}));



}