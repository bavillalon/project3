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

router.post("/token", passport.authenticate('jwt', { session: false}), function(req,res){
  console.log(req);
  var token = getToken(req.headers);
  if (token) {
      res.status(200).send({_id:req.user._id,username: req.user.username,runsheet:req.user.runsheet});
  } else {
    return res.status(401).send({success: false, msg: 'Unauthorized.'});
  }

})
// If no API routes are hit, send the React app
router.use( passport.authenticate('jwt', { session: false}), function(req, res) {
  console.log(req.route);
  var token = getToken(req.headers);
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
