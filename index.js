var relationsClass = require('./lib/deps/relationsClass');
var libGroups = require("./lib/deps/languages/libGroups.js");
var path = require("path");
var exec = require('child_process').exec;
var fs = require('graceful-fs');
var db = require('./lib/deps/database.js');
var lineReader = require('line-reader');
var async = require('async');
var resultFile = path.resolve(__dirname+'/../../app/data/result.csv')

exports.extract = function(website_path,include_node_modules,callback) {
	fs.writeFile(resultFile, '', function(){
		var parentDir = path.resolve(__dirname+'/Mongodb');
		relationsClass.getRelations(website_path,include_node_modules,function(err){
	    	db.findNodesById({},function(nodes){
	    		db.findLinks({},function(links){
	    			callback(err,{"nodes":nodes,"links":links,"groups":libGroups.groups});
				});
			});
		});

	});
};




var async = require('async');

exports.extract = function(website_path,include_node_modules,callback) {
	var parentDir = path.resolve(__dirname+'/Mongodb');
	relationsClass.getRelations(website_path,include_node_modules,function(err){
    	db.findNodesById({},function(nodes){
    		async.sortBy(nodes, function(myObject, cbSortBy){
			   cbSortBy(null,myObject.id);
			}, function(err, sortedNodes){
	    		db.findLinks({},function(links){
				    callback(err,{"nodes":sortedNodes,"links":links,"groups":libGroups.groups});
				});
			});
		});
	});
};
