//
// Purpose: MANIBUS companies APIs (router)
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const validateObjectId = require('../middleware/validateObjectId')
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const express = require("express");
//const mongoose = require("mongoose");
const router = express.Router();
const { Company, validateCompany } = require('../models/company');


/* C(REATE) - POST */
router.post("/", auth, async (req, res) => {
  // check valid body
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).json({code: '001', error: error.details[0].message});
  // create mongoose object
  let company = new Company(req.body);
  // save to db, check result and send 
  company = await company.save()
    .then(() => {
      res.send(company);
    })
    .catch((ex) => {
      res.status(400).send(ex);
    }); 



});


/* R(EAD) - GET */
// get all companies
router.get("/", async (req, res) => {
  const company = await Company.find().select('-__v');

  res.send(company);
});

// get company by id
router.get("/:id", validateObjectId, async (req, res) => {
  const company = await Company.find({ _id: req.params.id }).select();

  res.send(company);
});

// get company that match parts of name1 or name2
router.get("/find/:search", async (req, res) => {
  const company = await Company.find()
    .or([{
      name1: {
        $regex: ".*" + req.params.search + ".*",
        $options: "i",
      }
    }, {
      name2: {
        $regex: ".*" + req.params.search + ".*",
        $options: "i",
      }
    }])
    .select();

    res.send(company);
});

/* U(PDATE) - PUT */
// if auth and admin then update company
router.put('/:id', [auth, admin], validateObjectId , async (req, res) => {
  // check valid body
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).json({ code: '400', error: error.details[0].message });

  const result = await Company.findByIdAndUpdate(
    req.params.id,
    {
      name1: req.body.name1,
      name2: req.body.name2
    },
    { new: true }
  )
  

    res.send(result);

});

/* D(ELETE) - DELETE */
// admin user can delete company by id
router.delete('/:id', [auth, admin], validateObjectId , async (req, res) => {
    const result = await Company.findByIdAndRemove(req.params.id);

    res.send(result);
});


module.exports = router;
