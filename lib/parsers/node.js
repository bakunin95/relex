var esprima = require('esprima'),
	estraverse = require('estraverse'),
	esquery = require('esquery');
	var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");

module.exports = {
	name:"node",
	active: true,
	filter:{group:"js",exist:true},
	priority:20,
	parser: function(node,callback){


		try{
    		var ast = esprima.parse(node.data);
	    	var selectorAst = esquery.parse('[callee.object.name="app"][callee.property.name="get"]');			
			var ajaxResult = esquery.match(ast, selectorAst);
			if(ajaxResult.length>0){
				for (key in ajaxResult) {
					if(ajaxResult[key] !== null){
						if(_.isUndefined(ajaxResult[key].arguments[0].value) == false){
							var name = ajaxResult[key].arguments[0].value;
							parsersHelper.addNode({"name":name},node,{type:"jsnodeapget"},function(){	




							});	   		
						}
					}
				}
			}
		}
		catch(e){}


		

		callback(null,node);
	}
};