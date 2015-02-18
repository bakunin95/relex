var _ = require('underscore')._;
var async = require('async');
var parsersHelper = require("../deps/parsersHelper");


module.exports = {
	name: "form-element",
	active: true,
	filter:{ group: { $in: ["form","html","jsp","php"]}},
	priority:70,
	parser: function(node,callback){

		var formElements = [];
		var $ = parsersHelper.jQuery(node.data);

		async.each($("input,button,textarea,label,fieldset,legend,select,optgroup,option,datalist,keygen,output"), function(elem,cbElemForm){
			var type = $(elem).get(0).tagName;
				var rawName = parsersHelper.getFirstDefined([$(elem).attr("name"),$(elem).attr("id"),$(elem).attr("class"),""]);
				name = rawName +" "+parsersHelper.getCount('form-element-'+type);
				name = name + Math.floor((Math.random() * 10000) + 1); 

				formElements.push("["+type+":"+name+"]");
				parsersHelper.addNode({"name":node.name+"["+type+":"+name+"]",type:type,rawName:rawName, group:"form-element", data:$(elem).html()},node,{type:"composition"},function(err){
					$(elem).remove();
    				node.data = $.html(); 				
					cbElemForm();
				});
	    	},function(err){
	    		callback(null,node);
		    });	
	}
};