const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultSchema={
  instrumentNumber: String,
  grantor: String,
  grantee: String,
  bootType: String,
  bookNumber: String,
  pageNumber: String,
  numberOfPages: String,
  filingDate: String,
  instrumentType: String,
  instrumentDate: String,
  description: String,
  instrumentNameAndPages: String
};

const countySchema = new Schema(defaultSchema);

const Dawson = mongoose.model("dawson", countySchema,"dawson");

module.exports = Dawson;
