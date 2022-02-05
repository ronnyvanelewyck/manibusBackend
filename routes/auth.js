//
// Purpose: MANIBUS auth (login) APIs (router)
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//


const Joi = require("joi");
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const { User } = require('../models/user');



// REQUEST API (not CRUD)
router.post("/", async (req, res) => {
  console.log(req.body);
  // check valid body
  const { error } = validateUser(req.body);
  if (error) return res.status(409).json({ code: '409', error: 'invalid email or password'});
  // check email is valid
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ code: '401', error: 'invalid email or password'});
  // check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).json({ code: '401', error: 'invalid email or password'});

  // jsonwebtoken
  const token = user.generateAuthToken();

  //res.json({"token" : token});
  res.set('x-auth-token', token).json({ code: '200', error: token});
});

function validateUser(req) {

    const schema = Joi.object({
          email: Joi.string().required().email(),
          password: Joi.string().required()
    });
    return schema.validate(req);
  }

module.exports = router;
