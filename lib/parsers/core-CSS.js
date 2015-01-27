var cssparse = require("css").parse,
 	async = require("async"),
	_ = require('underscore')._;

var parsersHelper = require("../deps/parsersHelper");



module.exports = {
	name: "coreCSS",
	active: false,
	filter:{ group: { $in: ["html","jsp","php"]}},
	priority:14,
	parser: function(node,callback){

			var $ = parsersHelper.jQuery(node.data);

			async.parallel({
				css: function(cbParallel){
					

				    	async.each($('link[rel=stylesheet]'), function(elem,cbElem){	
				    		var name = (_.isUndefined($(elem).attr("href")) ? "undefined": $(elem).attr("href"));
							parsersHelper.correctPath(name,node,"js2js",function(err,correctPath){
								parsersHelper.addNode({"name":correctPath, group:"css"},node,{"type":"link"},function(){ 
									cbElem();
								}); 
							});
				    	},function(err){
				    		cbParallel();
					    });	
					
			    },
			    style: function(cbParallel){
			    	async.each($('style'), function(elem,cbElem){	
						parsersHelper.addNode({"name":"[css-markup "+ parsersHelper.scriptCount++ +"]", group:"css-markup"},node,{"type":"link"},function(){ 
							cbElem();
						}); 
			    	},function(err){
			    		cbParallel();
				    });	
			    }
			}, function(err){
				$ = null;
				delete $;

				callback(null,null);
			});	
		
	}
};