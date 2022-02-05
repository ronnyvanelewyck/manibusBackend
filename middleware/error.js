//
// Purpose: MANIBUS log server errors
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const winston = require('winston');


module.exports = function(err, req, res, next){
    winston.error(err.message, err);
    
    // error
    // warning
    // info
    // verbose
    // debug
    // silly
    
    res.status(500).json({ code: '500', error : err});
  }

