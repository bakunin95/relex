var relex = require("../index.js");

relex.extract("website_example",false,function(err,report){
	console.log(report);
});