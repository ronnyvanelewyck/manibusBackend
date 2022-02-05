//
// Purpose: MANIBUS homepage
// Author: Ronny Van Elewyck
// Version: 1.0
// Creation Date: 01.01.2022
// Modification Date: 01.01.2022
//

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "manibus", message: "This is not a pleasure trip! It's more like doing this for the first time. Please contact info@rvesolutions.be for additional instructions." });
});

module.exports = router;
