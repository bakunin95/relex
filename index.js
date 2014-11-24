var relationsClass = require('./lib/deps/relationsClass');
var analyseReportClass = require('./lib/deps/analyzeClass');

exports.extract = function(website_path,callback) {

	relationsClass.getRelations(website_path,function(err,relations){	
		analyseReportClass.attachReports(relations,function(err,grapheJSON){
			callback(err,grapheJSON);
		});
	});	

};