var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");

module.exports = {
	name: "js-function",
	active: true,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:60,
	parser: function(node,callback){

		async.parallel({
		    funcTypeA:function(cbfuncTypeA) {
		    	var funcTypeA = parsersHelper.esprimaQuery(node.data,'[type="FunctionDeclaration"]',
								 function(currentArray,cbEsp){
									var rawName = parsersHelper.getFirstDefinedArray(currentArray,["id.name"]);									 	
								 	
									if(currentArray.params.length>0){
										var params = _.pluck(currentArray.params,"name");
										rawName = rawName+"("+params.join(",")+")";
									}else{
										rawName = rawName+"()";
									}

								 	parsersHelper.addNode({name:node.name+":[function]:"+rawName,rawName:rawName, data:currentArray.body.body, group:"js-function"},node,{},function(){
										cbEsp();
									});
								 },
								 function(){
								 	cbfuncTypeA();
								 });
		        
		    },
		    funcTypeB:function(cbfuncTypeB) {
		    	var funcTypeB = parsersHelper.esprimaQuery(node.data,'[type="VariableDeclarator"][init.type="FunctionExpression"]',
								 function(currentArray,cbEsp){

									var rawName = parsersHelper.getFirstDefinedArray(currentArray,["init.id.name"]);
								 	
									if(currentArray.init.params.length>0){
										var params = _.pluck(currentArray.init.params,"name");
										rawName = rawName+"("+params.join(",")+")";
									}else{
										rawName = rawName+"()";
									}


								 	parsersHelper.addNode({name:node.name+":[function]:"+rawName,rawName:rawName, data:currentArray.init.body.body, group:"js-function"},node,{},function(){
										cbEsp();
									});
								 },
								 function(){
								 	cbfuncTypeB();
								 });		        
		    }
		}, function(err) {
			parsersHelper.errorHandler(err);
			callback(null,null);
		});


	}
};