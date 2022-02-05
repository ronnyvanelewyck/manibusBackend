//
// Purpose: MANIBUS startup configuration
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//


const config = require("config");


module.exports = function () {

// check jwtPrivateKey is available
if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
  }

}