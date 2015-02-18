<<<<<<< HEAD
module.exports = function (schema) {
    var Link = 	  schema.define("Link", {
						  source: Number,
						  target: Number,
						  relVar: {
						    type: String,
						    default: ""
						  },
						  type: {
						    type: String,
						    default: ""
						  }
			});
 
    return Link;
};
=======
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
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
