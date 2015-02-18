var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "js-object",
	active: false,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:60,
	parser: function(node,callback){



		var functionClasses = "";

		//var objectLitteralClasses = parsersHelper.esprimaQuery('[type="VariableDeclarator"][init.type="ObjectExpression"]',data);

		//["['init']['right']['properties']"]
//init.right.properties"
		var objectLitteralClasses2 = parsersHelper.esprimaQuery(node.data,'[type="VariableDeclarator"][init.right.type="ObjectExpression"]',
									 function(currentClass,cbEsp){
									 	var name = parsersHelper.getFirstDefined([currentClass.id.name,""]);

									 	//console.log("#######node",node.name);


									 	parsersHelper.addNode({name:node.name+":"+name, group:"js-object", data:currentClass.init.right.properties},node,{},function(){
													cbEsp();
										});
									 },
									 function(){
									 	callback(null,node);
									 });

		//init.properties
		//value.type Litteral or FunctionExpression

		//var prototypeClass = parsersHelper.esprimaQuery([type="ExpressionStatement"][expression.left.object.property.name="prototype"]);
		//Plus complexe que ça

		//var singletonClass = parsersHelper.esprimaQuery([type="VariableDeclarator"]['init'.type="NewExpression"]['init'.callee.type="FunctionExpression"]);

		//var PrototypeClass = parsersHelper.esprimaQuery([type="ExpressionStatement"][expression.left.object.property.name="prototype"]);

		/*
		if(objectLitteralClasses2 !== null && objectLitteralClasses2.length > 0 ){

			async.each(objectLitteralClasses2, function(currentClass,cbElem){	
				if(!_.isUndefined(currentClass.init) && !_.isUndefined(currentClass.init.right)){
					async.each(currentClass.init.right.properties, function(property,cbCurrClass){	
						console.log("#######property",property);
						cbCurrClass();
					},function(err){
			    		cbElem();
				    });
				}
				else{
					cbElem();
				}
				
	    	},function(err){
	    		callback(null,node);
		    });	
		}
		else{
			callback(null,node);
		}*/

		/*var name = $(elem).attr("name");
				if(_.isUndefined(name)){name = $(elem).attr("id");}

				formElements.push("["+type+":"+name+"]");
				parsersHelper.addNode({"name":"["+type+":"+name+"]", group:"form-element", data:$(elem).html()},node,{},function(){
					$(elem).remove();
    				node.data = $.html();
					cbElem();
				});*/


	}
};