const User = require("../models/user");

// Defining methods for the DawsonController
module.exports = {
  findById: function(req, res) {
    console.log(req.body.data)
    User
      .findByIdAndUpdate(req.params.id,{$push: {runsheet:req.body.data}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
