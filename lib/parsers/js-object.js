var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "js-object",
	active: true,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:60,
	parser: function(node,callback){
		async.parallel({
			    arrTypeA:function(cbArrTypeA) {
			    	var arrTypeA = parsersHelper.esprimaQuery(node.data,'[type="VariableDeclarator"][init.type="ObjectExpression"]',
									 function(currentArray,cbEsp){
										var rawName = parsersHelper.getFirstDefinedArray(currentArray,["id.name"]);	
									 	var data = parsersHelper.getFirstDefinedArray(currentArray,["init.properties"]);
									 	assignedElement(node.data,rawName,function(err,assignedElements){
									 		data = _.union(data,assignedElements);
										 	parsersHelper.addNode({name:node.name+":[object]:"+rawName,rawName:rawName, data:data, group:"js-object"},node,{},function(){
												cbEsp();
											});
										});
									 },
									 function(){
									 	cbArrTypeA();
									 });
			        
			    },
			    arrTypeB:function(cbArrTypeB) {
			    	var arrTypeB = parsersHelper.esprimaQuery(node.data,'[type="VariableDeclarator"][init.type="NewExpression"][init.callee.name="Object"]',
									 function(currentArray,cbEsp){
										var rawName = parsersHelper.getFirstDefinedArray(currentArray,["id.name"]);
									 	var data = parsersHelper.getFirstDefinedArray(currentArray,["init.arguments"]);
									 	assignedElement(node.data,rawName,function(err,assignedElements){
									 		data = _.union(data,assignedElements);
										 	parsersHelper.addNode({name:node.name+":[object]:"+rawName,rawName:rawName, data:data, group:"js-object"},node,{},function(){
												cbEsp();
											});
										});
									 },
									 function(){
									 	cbArrTypeB();
									 });		        
			    },
			    arrTypeC:function(cbArrTypeC){
			    	var arrTypeC = parsersHelper.esprimaQuery(node.data,'[type="ExpressionStatement"][expression.type="AssignmentExpression"][expression.left.type="MemberExpression"][expression.right.type="ObjectExpression"]',
									 function(currentArray,cbEsp){
										var first = parsersHelper.getFirstDefinedArray(currentArray,["expression.left.object.name"]);	 	
										var second = parsersHelper.getFirstDefinedArray(currentArray,["expression.left.property.name"]);
										
										var rawName = first+"."+second;

										//var rawName = "module.export";

										var name = node.name+":[object]:"+rawName+parsersHelper.getCount("module.export");

									 	var data = parsersHelper.getFirstDefinedArray(currentArray,["expression.right.properties"]);									
									 	parsersHelper.addNode({name:name,rawName:rawName, data:data, group:"js-object"},node,{},function(){
											cbEsp();
										});
									 },
									 function(){
									 	cbArrTypeC();
									 });	

			    }
			}, function(err) {
				parsersHelper.errorHandler(err);
    			callback(null,null);
			});


		
		function assignedElement(data,name,cbAssignedElement){
			var assignedElements = [];
			parsersHelper.esprimaQuery(data,'[type="ExpressionStatement"][expression.type="AssignmentExpression"][expression.left.object.name="'+name+'"]',
			function(currentArray,cbEspAssigned){
				var key = parsersHelper.getFirstDefinedArray(currentArray,["expression.left.property"]);
				var value = parsersHelper.getFirstDefinedArray(currentArray,["expression.right"]);
					assignedElements.push({type:"Property",key:key,value:value});
				cbEspAssigned();
			},
			function(){
				
/*
				parsersHelper.esprimaQuery(data,'[type="ExpressionStatement"][expression.type="CallExpression"][expression.callee.object.name="'+name+'"][expression.callee.property.name="push"]',
				function(currentArray2,cbEspAssigned2){
					var pushedElements = parsersHelper.getFirstDefinedArray(currentArray2,["expression.arguments"]);
					assignedElements = _.union(assignedElements, pushedElements);
					cbEspAssigned2();
				},
				function(){
					cbAssignedElement(null,assignedElements);
				});*/
				cbAssignedElement(null,assignedElements);
			});
		}

	}
};