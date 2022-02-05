//
// Purpose: MANIBUS validate mongoose object id
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const mongoose = require("mongoose");


module.exports = function(req, res, next){

      // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
  return res
    .status(404)
    .json({ code: '404', error: `Id ${req.params.id} invalid format` });

    next();

  }