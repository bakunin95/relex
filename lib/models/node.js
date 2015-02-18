<<<<<<< HEAD
module.exports = function (schema) {
    var Node = 	  schema.define("Node", {
						  name: {type: String},
						  rawType: {type: String},
						  rawName: {type: String},
						  rawValue: {type: String},
						  type: {type: String},
						  rootParent: {type: String},
						  rootParentId: {type: Number},
						  group: {type: String},
						  exist: {type: Boolean},
						  data: {type: String},
						  time: {
						    type: Number,
						    default: Date.now
						  },
						  cluster: {type: String},
						  file: {type: String},
						  folder: {type: String},
						  groupColor: {type: String},
						  groupText: {type: String},
						  groupFoci: {type: String}
			});
 
    return Node;
};
=======
var mongoose = require("mongoose"),
	  Schema = mongoose.Schema;
var NodeSchema = new mongoose.Schema({
  __v: {type: Number, select: false},
  name: {
    type: String,
    index: true,
    unique: true
  },
  rawName: String,
  rawValue: String,
  type:String,
  infoFile: Schema.Types.Mixed,
  group: {
    type: String,
    index: true
  },
  exist: Boolean,
  data: Schema.Types.Mixed,
  id: {type:Number,index: true},
  time : { type : Date, default: Date.now, index: true },
  cluster: Number,
  infoGroup: Schema.Types.Mixed
},{versionKey: false});

module.exports = mongoose.model('Node', NodeSchema); 
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
