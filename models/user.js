//
// Purpose: MANIBUS BACKEND SERVICES - user model
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

// don't pluralise name of db
mongoose.pluralize(null);

// task
const userSchema = new mongoose.Schema({
        firstname: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 40,
            trim: true
        },    
        lastname: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 80,
            trim: true
        },    
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 5,
            maxlength: 255
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 1024
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'company'
        },    
        group: {
            type: String,
            minlength: 2,
            maxlength: 80,
            trim: true
        },
        isAdmin: Boolean 
});

// add methode for authentication to user schema
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
}

// user model
const User = mongoose.model('user', userSchema);

// validations
function validateUser(user) {

    const schema = Joi.object({
          firstname: Joi.string().min(2).max(40).required(),
          lastname: Joi.string().min(2).max(80).required(),
          email: Joi.string().min(5).max(255).required().email(),
          password: new PasswordComplexity({
            min: 10,
            max: 255,
            lowerCase: 2,
            upperCase: 2,
            numeric: 2,
            symbol: 2,
            requirementCount: 4
          }),
          companyId: Joi.ObjectId(),
          group: Joi.string().min(2).max(80),
          isAdmin: Joi.boolean()
    });
    return schema.validate(user);
  }


module.exports = 
{
  User,
  validateUser
} 

