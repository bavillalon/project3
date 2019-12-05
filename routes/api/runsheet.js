const router = require("express").Router();
const runsheetController = require("../../controllers/runsheetController");
const axios = require("axios");

const passport = require("passport");
require('../../config/passport')(passport);

router
  .route("/:id")
  .get(runsheetController.sendCSV)
  .post(runsheetController.findById)
  .delete(runsheetController.clearRunsheet)


  
module.exports = router;
