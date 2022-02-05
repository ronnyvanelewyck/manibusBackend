//
// Purpose: MANIBUS BACKEND SERVICES - company model
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const mongoose = require("mongoose");
const Joi = require("joi");

// don't pluralise name of db
mongoose.pluralize(null);

// company
const companySchema = new mongoose.Schema({
    name1: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 10,
      trim: true
    },
    name2: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 80,
      trim: true
    }
});

// company model
const Company = mongoose.model("company", companySchema);

// validations
function validateCompany(company) {
  const schema = Joi.object({
      name1: Joi.string().min(3).max(80).required(),
      name2: Joi.string().min(1).max(80).required()
  });
  return schema.validate(company);
}

module.exports = {
  Company,
  validateCompany,
};
