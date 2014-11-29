
'use strict';
var constants = require( './deps/utilities/constants' );
var fs = require('graceful-fs');
var relationsClass = require('./deps/relationsClass');
var analyseReportClass = require('./deps/analyzeClass');
var process = require('process');

module.exports = function(program) {
	define( 'TEMPLATE_PATH', "app", this );
	define( 'WEBSITE_PATH', program.args[0], this );
	define( 'RESULT_PATH', program.args[1], this );

	var includenodemodules = false;
	if(program.includenodemodules){
		includenodemodules = true;
	}

	relationsClass.getRelations(constants.WEBSITE_PATH,includenodemodules,function(err,relations){	
		errorHandler(err);
		analyseReportClass.attachReports(relations,function(err,report){
			errorHandler(err)		
			fs.writeFile(constants.RESULT_PATH, JSON.stringify(report,null,4), function(err) {
				errorHandler(err)
			});
		});
	});	

	function errorHandler(err){
		if(err){
			console.log("Error (main.js):",err);
		}	
	}
};