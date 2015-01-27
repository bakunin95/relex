var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");

function escapeHTML(text){
       var chr = { '"': '', '&': '', '<': '', '>': '', '@': '' };
       function abc(a){
          return chr[a];
       }
       return text.replace(/[\"&<>]/g, abc);
}

module.exports = {
	name: "js-object-property",
	active: true,
	filter:{ group: { $in: ["js-object"]}},
	priority:80,
	parser: function(node,callback){

		async.eachSeries(node.data, function(property,cbFunc){	

				var group = null;
				var name = "";
				var rawValue = "";	
				var rawName = "";	


				switch(property.value.type){
					case "Literal":			

						if(!_.isUndefined(property.key.name)){
							group = "js-variable";
							var type = (typeof property.value.value);
							rawValue = parsersHelper.safeVariableContent(property.value.value);

							rawName = type+" "+property.key.name+":"+rawValue;
						}

					break;
					case "FunctionExpression":
						group = "js-method";
						rawName = property.key.name;

						if(property.value.params.length>0){
							var params = _.pluck(property.value.params,"name");
							rawName = rawName+"("+params.join(",")+")";
						}
						else{
							rawName = rawName+"()";
						}

					break;
					case "ObjectExpression":
						group = "js-object";
						name = "[object]";
					break;
					case "ArrayExpression":
						group = "js-array";
						name = "[array]";
					break;
					case "Identifier":
						group = "js-variable";
						rawName = "var "+property.key.name;

					break;
					default:

						if(property.key.type === "Identifier"){
							group = "js-variable";
							rawName = "var "+property.key.name;
						}
						
					break;
				}
			
			if(group !== null){
				name = node.name + ":"+name + rawName;
				parsersHelper.addNode({"name":name,rawName:rawName,rawValue:rawValue, group:group, data:property},node,{},function(){
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