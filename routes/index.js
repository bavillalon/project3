const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
var passport = require('passport');
const Book = require("../models/counties")
require('../config/passport')(passport);

// API Routes
router.use("/api", apiRoutes);

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


// If no API routes are hit, send the React app
router.use( passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  console.log(req);
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
  //if (token) {
  //  Book.find(function (err, books) {
  //    if (err) return next(err);
  //    res.json(books);
  //  });
  //} else {
  //  return res.status(401).send({success: false, msg: 'Unauthorized.'});
  //}
});

module.exports = router;
