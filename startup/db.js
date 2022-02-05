//
// Purpose: MANIBUS startup database
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const mongoose = require("mongoose");
const config = require("config");
const winston = require('winston');

module.exports = function () {

    // connect to database
    const db = config.get("db");
    mongoose
        .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => winston.info(`connected to ${db}`));

}