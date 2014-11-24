var relex = require("./lib/main.js");


relex.getRelations("example/website_example",function(err,RELATIONS){
	console.log(RELATIONS);
});