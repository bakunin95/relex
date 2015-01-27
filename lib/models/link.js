var mongoose = require("mongoose"),
	  Schema = mongoose.Schema;

var LinkSchema = new mongoose.Schema({
  source: {
    type: Schema.Types.Mixed,
    index: true
  },
  target: {
    type: Schema.Types.Mixed,
    index: true
  },
  type: String
},{versionKey: false});

module.exports = mongoose.model('Link', LinkSchema); 