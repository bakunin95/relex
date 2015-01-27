var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "js-variable",
	active: true,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:60,
	parser: function(node,callback){
		async.parallel({
			    arrTypeA:function(cbArrTypeA) {
			    	var arrTypeA = parsersHelper.esprimaQuery(node.data,'[type="VariableDeclarator"][init.type="Identifier"]',
									 function(currentArray,cbEsp){
										var rawName = parsersHelper.getFirstDefinedArray(currentArray,["id.name"]);	
										//var rawValue = parsersHelper.getFirstDefinedArray(currentArray,["init.value"]);									 	
								 	
										rawName = "var "+rawName;


									 	parsersHelper.addNode({name:node.name+":"+rawName,rawName:rawName, group:"js-variable"},node,{},function(){
											cbEsp();
										});
									 },
									 function(){
									 	cbArrTypeA();
									 });
			        
			    },
			    arrTypeB:function(cbArrTypeB) {
			    	var arrTypeB = parsersHelper.esprimaQuery(node.data,'[type="VariableDeclarator"][init.type="Literal"]',
									 function(currentArray,cbEsp){
										var rawName = parsersHelper.getFirstDefinedArray(currentArray,["id.name"]);
										var rawValue = parsersHelper.getFirstDefinedArray(currentArray,["init.value"]);									 	

										rawValue = parsersHelper.safeVariableContent(rawValue);
										
										var type = (typeof rawName);
										rawName = type+" "+rawName+":"+rawValue;

									 	parsersHelper.addNode({name:node.name+":"+rawName,rawName:rawName,rawValue:rawValue, group:"js-variable"},node,{},function(){
											cbEsp();
										});
									 },
									 function(){
									 	cbArrTypeB();
									 });		        
			    }
			}, function(err, results) {
				parsersHelper.errorHandler(err);
    			callback(null,null);
			});

	}
};