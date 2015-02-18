var async = require('async');
var _ = require('underscore')._;
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "jsp",
	active: true,
	filter:{ group: { $in: ["jsp"]}},
	priority:50,
	parser: function(node,callback){


		//var $ = parsersHelper.jQuery(node.data);

		/*
		async.each($('form'), function(elem,cbForm){	


			var action = (!_.isUndefined($(elem).attr("action"))) ? ": "+$(elem).attr("action") : ": "+$(elem).attr("name"); 
			action = (!_.isUndefined(action)) ? action : $(elem).attr("id");
			if (_.isUndefined(action)){ action = "";}
			parsersHelper.addNode({"name":"[form "+parsersHelper.formCount++ + action +"]", group:"form", data:$(elem).html()},node,{"type":"composition"},function(){
    			cbForm();
			});
    	},function(err){
    		callback(null,node);
    	});	
		*/

		callback(null,node);

		
	}
};

//<%@ page import="user.*" %>