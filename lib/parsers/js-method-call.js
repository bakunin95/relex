var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "js-method-call",
	active: false,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:90,
	parser: function(node,callback){


		var methodCall = parsersHelper.esprimaQuery(node.data,'[type="CallExpression"][callee.type="MemberExpression"]',
								 function(currentClass,cbEsp){

								 	

								 	if(currentClass.callee.object !== null){
										var object = currentClass.callee.object.name;
										var call = currentClass.callee.property.name;

										if(!_.isUndefined(object) && !_.isUndefined(call)){
											var name = object+"."+call;
											parsersHelper.addNode({name:node.name+":"+name, group:"js-call"},node,{},function(){
												cbEsp();
											});
											
										}
										else{
											cbEsp();
										}


										
								 	}
								 	else{
								 		cbEsp();	
								 	}

								 	//var name = parsersHelper.getFirstDefined([currentClass.id.name,""]);

								 	//console.log("#######node",node.name);


								 	//parsersHelper.addNode({name:node.name+":"+name, group:"js-object", data:currentClass.init.right.properties},node,{},function(){
												//cbEsp();
									//});
								 },
								 function(){
								 	callback(null,node);
								 });
			
	}
};