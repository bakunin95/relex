var _ = require('underscore')._;
var async = require('async');
var parsersHelper = require("../deps/parsersHelper");


module.exports ={
	name: "htmlElement",
	active: true,
	filter:{ group: { $in: ["html","jsp","php"]}},
	priority:80,
	parser: function(node,callback){

		var $ = parsersHelper.jQuery(node.data);
		function findHtmlElement(args,cbFindForm){

			var type = args[0];
			var attr = args[1];

	    	async.each($(type), function(elem,cbElem){	
				var rawName = parsersHelper.getFirstDefined([$(elem).attr(attr),$(elem).attr("name"),$(elem).attr("id"),$(elem).attr("class"),""]);

				var name = rawName +" "+parsersHelper.getCount(type);

				parsersHelper.addNode({"name":"["+type+":"+name+"]",rawName:rawName, group:"html-element", data:$(elem).html()},node,{},function(){
					$(elem).remove();
    				node.data = $.html();
					cbElem();
				});
	    	},function(err){
	    		cbFindForm();
		    });	
		}

		async.map([['img','src'],['iframe','src'],['object','data'],['video','src'],['audio','src'],['canvas','id'],['svg','id']], findHtmlElement, function(err, results){
			callback(null,node);
		});

	}
};

