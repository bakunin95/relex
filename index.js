var relationsClass = require('./lib/deps/relationsClass');
var analyseReportClass = require('./lib/deps/analyzeClass');

exports.extract = function(website_path,include_node_modules,callback) {

	relationsClass.getRelations(website_path,include_node_modules,function(err,relations){	
		analyseReportClass.attachReports(relations,function(err,grapheJSON){
			callback(err,grapheJSON);
		});
	});	

};