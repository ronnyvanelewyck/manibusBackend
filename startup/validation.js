//
// Purpose: MANIBUS startup validation
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//


const Joi = require("joi");



module.exports = function () {

    Joi.ObjectId = require('joi-objectid')(Joi);

}