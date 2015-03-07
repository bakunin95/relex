module.exports = function (schema) {
    var Node = 	  schema.define("Node", {
						  name: {type: String},
						  rawType: {type: String},
						  rawName: {type: String},
						  rawValue: {type: String},
						  visibility: {type: String},
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

