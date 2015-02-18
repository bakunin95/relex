var cssparse = require("css").parse,
 	async = require("async"),
	_ = require('underscore')._;

var parsersHelper = require("../deps/parsersHelper");


function escapeHTML(text){
       var chr = { '"': '', '&': '', '<': '', '>': '', '@': '' };
       function abc(a){
          return chr[a];
       }
       return text.replace(/[\"&<>]/g, abc);
}

module.exports = {
	name: "css-rule",
	active: true,
	filter:{group:"css"},
	priority:50,
	parser: function(node,callback){

		try{
			if(node.data){
				var ast = cssparse(node.data);
				var rules = [];
				async.each(ast.stylesheet.rules, function(rule,cbVar){	
					


				  if(rule.selectors !== null && _.isUndefined(rule.selectors) == false){
					var rawName = escapeHTML(rule.selectors.join(" "));
				  	parsersHelper.addNode({"name":node.name+"["+rawName+"]",rawName:rawName, group:"css-rule"},node,{type:"composition"},function(err){
						cbVar();
					});
				  }
				  else{
				  	cbVar();
				  }			  

				  										    		
				},function(err){
					callback(null,null);

				});	 
			}
			else{
				callback(null,null);
			}
		}catch(e){
			callback(null,null);
		}
		
	}
};