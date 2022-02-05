//
// Purpose: MANIBUS users APIs (router)
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require("express");
//const mongoose = require("mongoose");
const router = express.Router();
const { User, validateUser } = require('../models/user');
//const { Company } = require('../models/company');


/* C(REATE) - POST */
router.post("/", [auth, admin], async (req, res) => {
  // check valid body
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ code: '400', error: error.details[0].message });
  // check user is already existing
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).json({ code: '409', error: `user already registered: ${req.body.email}` });

  // create mongoose object
  user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  });
  // crypt password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const token = user.generateAuthToken();

  user = await user.save();
  res.header('x-auth-token', token).send({ '_id': user._id });

});

/* R(EAD) - GET */
// get all users
router.get("/", [auth, admin], async (req, res) => {
  const user = await User.find().populate('company', '-__v').select('-password -__v');

  res.send(user);
});

// get current user
router.get("/:me", auth, async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('company', '-__v')
    .select('-password -__v');

  if (!user)
    res.status(404).json({ code: '404', error: `current user not found: ${req.user._id}` });
  else {
    res.send(user);
  }


});

// get user by firstname or lastname
router.get("/find/:search", [auth, admin], async (req, res) => {
  // check search text is not initial
  if (req.query.searchtext === '') return res.status(400).json({ code: '400', error: 'search text can not be empty' });

  const result = await User.find()
    .or([{
      firstname: {
        $regex: ".*" + req.query.searchtext + ".*",
        $options: "i",
      }
    }, {
      lastname: {
        $regex: ".*" + req.query.searchtext + ".*",
        $options: "i",
      }
    }])
    .select('-__v -password');

  // check match found
  if (result[0] === undefined) return res.status(404).json({ code: '404', error: 'no user found' });

  res.send(result);
});

// U(PDATE) APIs
router.put('/:id', [auth, admin], validateObjectId, async (req, res) => {
  // check user is already existing
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ code: '404', error: 'user not found' });

  // check fields to update
  if (req.body.firstname === undefined) { req.body.firstname = user.firstname };
  if (req.body.lastname === undefined) { req.body.lastname = user.lastname };
  if (req.body.group === undefined) { req.body.group = user.group };
  if (req.body.companyId === undefined) { req.body.companyId = user.companyId };
  if (req.body.isAdmin === undefined) { req.body.isAdmin = user.isAdmin };

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      group: req.body.group,
      companyId: req.body.companyId,
      isAdmin: req.body.isAdmin
    },
    {
      new: true,
    }
  );

  res.send({
    '_id': user._id,
    'email': user.email,
    'firstname': user.firstname,
    'lastname': user.lastname,
    'group': user.group,
    'companyId': user.company,
    'isAdmin': user.isAdmin
  });

});
// change password
router.put('/pw/:id', auth, validateObjectId, async (req, res) => {
  // check user is already existing
  let user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ code: '404', error: 'user not found' });

  // check fields to update
  if (req.body.password === undefined) return res.status(404).json({ code: '404', error: 'invalid token or password' });

  // crypt password
  const savePassword = req.body.password;
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      password: req.body.password,
    },
    {
      new: true,
    }
  );

  res.send({
    '_id': user._id,
    'new password': savePassword
  });

});

// D(ELETE) APIs
router.delete('/:id', [auth, admin], validateObjectId, async (req, res) => {
  // find user by id and remove
  User.findByIdAndRemove(req.params.id, {
    rawResult: true,
  }).then((result) => {
    res.send(result);
  })
    .catch(() => {
      res.status(404).json({ code: '404', error: 'no delete' });
    }); 


});


module.exports = router;
