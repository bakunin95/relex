var _ = require('underscore')._;
var async = require('async');
var detectiveAmd = require('detective-amd');

var parsersHelper = require("../deps/parsersHelper");

module.exports = {
	name: "jsAMD",
	active: true,
	filter:{ group: { $in: ["js","js-markup"]}},
	priority:15,
	parser: function(node,callback){

			try{
    			var relations = detectiveAmd(node.data);

				async.eachLimit(relations,3, function (relation, cbRel) {
					if(relation.substr(relation.length - 3) !== ".js"){
    					relation = relation+".js";
    				}
			        parsersHelper.addNode({name:relation},node,{type:"js2js"},function(){	
			
			        	cbRel();	



					});	       
			        
			    },function(err){
			    	callback(null,node);
			    });
    		}
    		catch(e){
    			//detective can't parse this file
    			callback(null,node);
    		}
		
	}
};