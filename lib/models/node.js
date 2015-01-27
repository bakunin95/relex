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