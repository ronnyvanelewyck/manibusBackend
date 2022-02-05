//
// Purpose: MANIBUS (the new SAM) BACKEND SERVICES
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//


const winston = require('winston');

// express
const express = require("express");
const app = express();

// start logging
require('./startup/logging')(app);

// start routes
require('./startup/routes')(app);

// start database
require('./startup/db')();

// start config
require('./startup/config')();

// start validation
require('./startup/validation')();


// get port from ENV variable if not found use 3000 as default
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));


module.exports = server;







