var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "js-function-property",
	active: true,
	filter:{ group: { $in: ["js-function"]}},
	priority:80,
	parser: function(node,callback){

		async.eachSeries(node.data, function(expression,cbFunc){			
			var type = parsersHelper.getFirstDefinedArray(expression,["type"]);									 	
			var expressionType = parsersHelper.getFirstDefinedArray(expression,["expression.type"]);
			var thisExpression = parsersHelper.getFirstDefinedArray(expression,["expression.left.object.type"]);
			var rawName = parsersHelper.getFirstDefinedArray(expression,["expression.left.property.name"]);
			var valueType = parsersHelper.getFirstDefinedArray(expression,["expression.right.type"]);
			var name = "";
			if(type !=="" && expressionType =="AssignmentExpression" && thisExpression =="ThisExpression"){
					var group = null;			
					switch(valueType){
						case "Literal":
							group = "js-variable";
							var type = (typeof rawName);
							rawName = type+" "+rawName;

						break;
						case "FunctionExpression":
							group = "js-method";
						break;
						case "ObjectExpression":
							group = "js-object";
							name = "[object]"+rawName;
						break;
						case "ArrayExpression":
							group = "js-array";
							name = "[array]"+rawName;
						break;
						case "Identifier":
							group = "js-variable";
						break;
					}
				
				if(group !== null){
					parsersHelper.addNode({name:name,rawName:rawName, group:group, data:expression},node,{},function(){
						cbFunc();
					});							
				}
				else{
					cbFunc();
				}
			}
			else{
				cbFunc();	
			}
    	},function(err){
    		callback(null,null);
    	});		
		
	}
};