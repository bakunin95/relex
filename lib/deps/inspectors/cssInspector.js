var cssparse = require("css").parse,
 	async = require("async"),
	_ = require('underscore')._;


module.exports = function cssInspect(data, callback) {
		var rules = [];

		try{

			var ast = cssparse(data);

			async.map(ast.stylesheet.rules, function(rule,cbVar){	

			  if(rule.selectors !== null && _.isUndefined(rule.selectors) == false){
			  	rules.push(escapeHTML(rule.selectors.join(" ")));
			  }			  

			  cbVar(null,"");										    		
			},function(err,variableList){
				if(err){
					console.log("javaScriptInspect.js",err);
				}	
				callback(err,{"rules":rules});
			});	 
		}catch(e){
			callback(null,{"rules":[]});
		};			
		 
		function escapeHTML(text){
       var chr = { '"': '', '&': '', '<': '', '>': '', '@': '' };
       function abc(a)
       {
          return chr[a];
       }
       return text.replace(/[\"&<>]/g, abc);
    }
};