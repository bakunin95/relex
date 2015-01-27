var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "form",
	active: true,
	filter:{ group: { $in: ["html","jsp","php"]}},
	priority:60,
	parser: function(node,callback){



		var $ = parsersHelper.jQuery(node.data);

		async.each($('form'), function(elem,cbForm){	

			var rawName = parsersHelper.getFirstDefined([$(elem).attr("action"),$(elem).attr("name"),$(elem).attr("id"),$(elem).attr("class"),""]);
			
			name = rawName +" "+parsersHelper.getCount('form');

			parsersHelper.addNode({"name":"[form "+ name +"]",rawName:rawName, group:"form", data:$(elem).html()},node,{"type":"composition"},function(){
    			$(elem).html("");
    			node.data = $.html();
    			cbForm();
			});
    	},function(err){
    		callback(null,node);
    	});	
		

		
	}
};