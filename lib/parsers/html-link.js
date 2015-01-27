var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "html-link",
	active: true,
	filter:{ group: { $in: ["html","jsp","php"]}},
	priority:13,
	parser: function(node,callback){		
		var $ = parsersHelper.jQuery(node.data);

		async.eachSeries($('a'), function(elem,cbCoreHtml){	

			var name = (_.isUndefined($(elem).attr("href")) ? "no href": $(elem).attr("href"));

			parsersHelper.correctPath(name,node,"js2js",function(err,correctPath){

				parsersHelper.addNode({"name":correctPath, group:"link"},node,{"type":"link"},function(){ 
					cbCoreHtml();
				});
			});
    	},function(err){
    		callback(null,null);
	    });	
		
	}
};