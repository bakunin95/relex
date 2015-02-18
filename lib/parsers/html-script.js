var     _ = require('underscore')._;
var async = require('async');
var parsersHelper = require("../deps/parsersHelper");
var cheerio = require('cheerio');

module.exports = {
	name: "CoreHtml",
	active: true,
	filter:{ group: { $in: ["html","jsp","php"]}},
	priority:20,
	parser: function(node,callback){

		var $ = parsersHelper.jQuery(node.data);


		

			async.each($('script'), function(elem,cbElem){	
				var newNode = {};
				var link = {};

				var random = Math.floor((Math.random() * 10000) + 1);

				if(_.isUndefined($(elem).attr("src")) || $(elem).attr("src") == null){
					newNode.name = "[script "+ ((parsersHelper.scriptCount++)+random) +"]";
					newNode.group = "js-markup";
					newNode.data = $(elem).html();
					newNode.exist = false;
					link.type = "script inside";
				}
				else{

					newNode.name = $(elem).attr("src");
					link.type = "use";
				}

				parsersHelper.correctPath(newNode.name,node,"js2js",function(err,correctPath){
					newNode.name = correctPath;

					parsersHelper.addNode(newNode,node,link,function(){ 
						cbElem();
					});

				});

	    	},function(err){
	    		callback(null,null);
		    });

	}
};