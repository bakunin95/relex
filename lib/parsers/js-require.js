var _ = require('underscore')._;
var async = require('async');
var detective = require('detective');
var parsersHelper = require("../deps/parsersHelper");

module.exports = {
	name: "jsRequire",
	active: true,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:15,
	parser: function(node,callback){




			try{
    			var relations = detective(node.data);

				async.each(relations, function (relation, cbRel) {

					parsersHelper.correctPath(relation,node,"js2js",function(err,correctPath){
						if(correctPath.substr(correctPath.length - 3) !== ".js"){
	    					correctPath = correctPath+".js";
	    				}

				        parsersHelper.addNode({name:correctPath},node,{type:"js2js"},function(){	
				        	cbRel();	
						});	
					});       
			        
			    },function(err){
			    	callback(null,null);
			    });
    		}
    		catch(e){
    			console.log(e);
    			//detective can't parse this file
    			callback(null,null);
    		}
		
	}
};