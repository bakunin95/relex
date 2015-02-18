var async = require("async");
var parsersHelper = require("../deps/parsersHelper");

module.exports = {
	name: "Hull",
	active: true,
	filter:{},	
	priority:200,
	parser: function(node,callback){


			


				    		switch(node.group){
								case "html":
								case "css":
								case "css-markup":
								case "js-markup":
								case "js-unreachable":
								case "css-unreachable":
									node.cluster = 3;
									callback(null,node);
								break;
								case "php":
								case "java":
								case "js":
									


									node.cluster = 2;
									
									/*parsersHelper.getLinkList({"target":node.id},function(links){
										console.log(links);
										/*if(links !== null && links.length > 0){
											async.map(links, function(link,cbListJs){
												parsersHelper.getNode({"id":link.source},function(err,source){
													cbListJs(err,source);											
												});
											},function(err,list){
									    		relationsClass.errorHandler(err);

												
												var groups = _.pluck(list, "group");

									    		if(_.contains(groups, "html") == true){
													node.cluster = 3;
												}
												else{
													node.cluster = 2;
												}
												callback(null,node);								    		
									    	});
									    }
									    else{
									    	callback(null,node);
									    }
									
									});*/

									callback(null,node);

								break;
								default:
									node.cluster = 1;
									callback(null,node);
								break;
							}
								
								
							
 





		
	}
};