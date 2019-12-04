const User = require("../models/user");
const csv = require("express-csv");
const stringify = require('csv-stringify');

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
  },
  sendCSV: function(req,res){
      console.log(req.params.id)
      User
      .findById(req.params.id)
      .then(dbModel => {
          console.log(dbModel.runsheet);
    
          res.setHeader('Content-Disposition', 'attachment; filename=runsheet.txt');
          res.setHeader('connection','keep-open')
          res.writeHead(200,{'Content-Type': 'text/csv'});

          res.flushHeaders();

          // ta-da! this is cool, right?
          // stringify return a readable stream, that can be directly piped
          // to a writeable stream which is "res" (the response object from express.js)
          // since res is an abstraction over node http's response object which supports "streams"
          stringify(dbModel.runsheet.map((document) => {
              console.log(JSON.parse(document)[0])
              return JSON.parse(document)[0]}), { header: true })
            .pipe(res);

        })
      .catch(err => res.status(422).json(err));
  }
};
