var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "js-array",
	active: true,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:60,
	parser: function(node,callback){

		async.parallel({
			    arrTypeA:function(cbArrTypeA) {
			    	var arrTypeA = parsersHelper.esprimaQuery(node.data,'[type="VariableDeclarator"][init.type="ArrayExpression"]',
									 function(currentArray,cbEsp){
										var rawName = parsersHelper.getFirstDefinedArray(currentArray,["id.name"]);									 	
									 	var data = parsersHelper.getFirstDefinedArray(currentArray,["init.elements"]);
									 	assignedElement(node.data,rawName,function(err,assignedElements){
									 		data = _.union(data,assignedElements);
										 	parsersHelper.addNode({name:node.name+":[array]:"+rawName,rawName:rawName, data:data, group:"js-array"},node,{},function(){
												cbEsp();
											});
										});
									 },
									 function(){
									 	cbArrTypeA();
									 });
			        
			    },
			    arrTypeB:function(cbArrTypeB) {
			    	var arrTypeB = parsersHelper.esprimaQuery(node.data,'[type="VariableDeclarator"][init.type="NewExpression"][init.callee.name="Array"]',
									 function(currentArray,cbEsp){
										var rawName = parsersHelper.getFirstDefinedArray(currentArray,["id.name"]);
									 	var data = parsersHelper.getFirstDefinedArray(currentArray,["init.arguments"]);
									 	assignedElement(node.data,rawName,function(err,assignedElements){
									 		data = _.union(data,assignedElements);
										 	parsersHelper.addNode({name:node.name+":[array]:"+rawName,rawName:rawName, data:data, group:"js-array"},node,{},function(){
												cbEsp();
											});
										});
									 },
									 function(){
									 	cbArrTypeB();
									 });		        
			    }
			}, function(err, results) {
				parsersHelper.errorHandler(err);
    			callback(null,node);
			});


		
		function assignedElement(data,name,cbAssignedElement){
			var assignedElements = [];
			parsersHelper.esprimaQuery(data,'[type="ExpressionStatement"][expression.type="AssignmentExpression"][expression.left.object.name="'+name+'"]',
			function(currentArray,cbEspAssigned){
				var element = parsersHelper.getFirstDefinedArray(currentArray,["expression.right"]);
					assignedElements.push(element);
				cbEspAssigned();
			},
			function(){

				parsersHelper.esprimaQuery(data,'[type="ExpressionStatement"][expression.type="CallExpression"][expression.callee.object.name="'+name+'"][expression.callee.property.name="push"]',
				function(currentArray2,cbEspAssigned2){
					var pushedElements = parsersHelper.getFirstDefinedArray(currentArray2,["expression.arguments"]);
					assignedElements = _.union(assignedElements, pushedElements);
					cbEspAssigned2();
				},
				function(){
					cbAssignedElement(null,assignedElements);
				});
	
			});
		}

	}
};