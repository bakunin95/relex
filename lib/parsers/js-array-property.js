var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "js-array-property",
	active: true,
	filter:{ group: { $in: ["js-array"]}},
	priority:80,
	parser: function(node,callback){

		async.eachSeries(node.data, function(property,cbFunc){	

			var rawName = "";
			var name = "";

				var group = null;
				switch(property.type){
					case "Literal":
						group = "js-variable";
						rawName = parsersHelper.getFirstDefinedArray(property,["value"]);
						var type = (typeof rawName);
						rawName = type+" "+rawName;
						if(typeof rawName ==="string"){
							rawName = rawName.replace(/\W/g, ' ');
						}
					break;
					case "FunctionExpression":
						group = "js-method";
						name = "[method]"+rawName;

						rawName = "function()";
						if(property.params.length>0){
							var params = _.pluck(property.params,"name");
							rawName = "function("+params.join(",")+")";
						}					
					break;
					case "ObjectExpression":
						group = "js-object";
						name = "[object]"+rawName;
						rawName = "Object";
					break;
					case "ArrayExpression":
						group = "js-array";
						name = "[array]"+rawName;
						rawName = "Array";
					break;
					case "Identifier":
						group = "js-variable";
						rawName = "var "+parsersHelper.getFirstDefinedArray(property,["name"]);
					break;
				}
			
			name = name + Math.floor((Math.random() * 10000) + 1); 
			if(group !== null){
				name = node.name + ":"+rawName;
				parsersHelper.addNode({"name":name,rawName:rawName, group:group, data:property},node,{},function(){
					cbFunc();
				});							
			}
			else{
				cbFunc();
			}
    	},function(err){
    		callback(null,node);
    	});		
	}
};