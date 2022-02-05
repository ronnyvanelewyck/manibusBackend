//
// Purpose: MANIBUS startup routes
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const express = require("express");
const homepage = require("../routes/homepage");
const companies = require("../routes/companies");
const users = require("../routes/users");
const auth = require("../routes/auth");
const tasks = require("../routes/tasks");
const workflows = require("../routes/workflows");
const error = require("../middleware/error");
const cors = require('cors');

// additional web security express
const helmet = require("helmet");
// additional web logging
const morgan = require("morgan");
const winston = require('winston');

module.exports = function (app) {

    // to fix error between localhost and localhost
    app.use(cors())

    // accept json
    app.use(express.json());
    //app.use(express.urlencoded({extended : true}));

    // set additional security for http headers
    app.use(helmet());

    //default view
    app.set('view engine', 'pug');

    // activate additional logging in development
    // default is development
    // set environment variable by     export NODE_ENV=production
    if (app.get("env") === "development") {
        winston.silly("Morgan logging enabled because in development ...");
        app.use(morgan("combined"));
    }

    // companies
    app.use("/api/companies", companies);

    // users
    app.use("/api/users", users);

    // auth
    app.use("/api/auth", auth);

    // tasks
    app.use("/api/tasks", tasks);

    // workflows
    app.use("/api/workflows", workflows);

    // homepage
    app.use("/", homepage);

    // error middleware
    app.use(error);

}