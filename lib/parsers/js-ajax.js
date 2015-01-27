var _ = require('underscore')._;
var async = require('async');
var detective = require('detective'),
	esprima = require('esprima'),
	estraverse = require('estraverse'),
	esquery = require('esquery');

var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name:"jsAjax",
	active: false,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:30,
	parser: function(node,callback){




			async.parallelLimit({
			    isAjax:function(cbisAjax) {
			    	
			    	try{
			    		
			    		var ast = esprima.parse(node.data);
				    	var selectorAst = esquery.parse('[callee.object.name="$"][callee.property.name="ajax"]');			
						var ajaxResult = esquery.match(ast, selectorAst);	

						if(ajaxResult.length>0){
							_.each(ajaxResult, function (result) {
								if(result !== null){
									_.each(result.arguments[0].properties, function (property) {
										if(property.key.name == "url"){
											var name = property.value.value;
											parsersHelper.addNode({"name":name},node,{type:"jsAndajax"},function(){	
												cbisAjax();
											});	      		
										}

									});
								}
							});
						}
					}
					catch(e){
						cbisAjax();
					}
			    },
			    isGetScript:function(cbisgetscript) {
			    	try{
			    		var ast = esprima.parse(data);
				    	var selectorAst = esquery.parse('[callee.object.name="$"][callee.property.name="getScript"]');			
						var ajaxResult = esquery.match(ast, selectorAst);

						if(ajaxResult.length>0){
							for (key in ajaxResult) {
								if(ajaxResult[key] !== null){
									if(_.isUndefined(ajaxResult[key].arguments[0].value) == false){
										var name = ajaxResult[key].arguments[0].value;
										parsersHelper.addNode({"name":name},node,{type:"jsAndajax"},function(){	
			        						cbisgetscript();
										});	   		
									}
								}
							}
						}
					}
					catch(e){
				        cbisgetscript();
					}
			    },
			    isLoad:function(cbisload) {
			     	try{
			     		var ast = esprima.parse(data);
				    	var selectorAst = esquery.parse('[callee.object.callee.name="$"][callee.property.name="load"]');			
						var ajaxResult = esquery.match(ast, selectorAst);

						if(ajaxResult.length>0){
							for (key in ajaxResult) {
								if(ajaxResult[key] !== null){
									if(_.isUndefined(ajaxResult[key].arguments[0].value) == false){	 
										var name = ajaxResult[key].arguments[0].value;
										parsersHelper.addNode({"name":name},node,{type:"jsAndajax"},function(){	
											cbisload();
										});	     		
									}
								}
							}
						}
					}
					catch(e){
						cbisload();
					}
			        
			    },
			    isJSON:function(cbisgetscript) {
			    	try{
			    		var ast = esprima.parse(data);
				    	var selectorAst = esquery.parse('[callee.object.name="$"][callee.property.name="getJSON"]');			
						var ajaxResult = esquery.match(ast, selectorAst);

						if(ajaxResult.length>0){
							for (key in ajaxResult) {
								if(ajaxResult[key] !== null){
									if(_.isUndefined(ajaxResult[key].arguments[0].value) == false){
										var name = ajaxResult[key].arguments[0].value;
										parsersHelper.addNode({"name":name},node,{type:"jsAndajax"},function(){	
											cbisgetscript();
										});	   		
									}
								}
							}
						}
					}
					catch(e){
						cbisgetscript();
					}
			        
			    },
			},3, function(err, results) {
				parsersHelper.errorHandler(err);
    			callback(null,null);
			});
		
	}
};