var relationsClass = require('./lib/deps/relationsClass');
var libGroups = require("./lib/deps/languages/libGroups.js");
var path = require("path");
var exec = require('child_process').exec;
var fs = require('graceful-fs');
var json2csv = require('json2csv');
var db = require('./lib/deps/database.js');


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



		/*exec('mongoexport --db archvis --collection nodes --out ../data/nodes.json --jsonArray ',{cwd: parentDir}, function (error, stdout, stderr) {
			exec('mongoexport --db archvis --collection links --out ../data/links.json --jsonArray',{cwd: parentDir}, function (error, stdout, stderr) {
				exec('mongoexport --db archvis --collection nodes --csv --out ../data/nodes.csv --fields id,name,group,exist',{cwd: parentDir}, function (error, stdout, stderr) {
					exec('mongoexport --db archvis --collection links --csv --out ../data/links.csv --fields source,target,type',{cwd: parentDir}, function (error, stdout, stderr) {
						fs.writeFile(__dirname+"/data/groups.json",JSON.stringify(libGroups.groups), function(err) {				
							json2csv({data: libGroups.groups, fields: ['keyword', 'label', 'color','text','count']}, function(err, csv) {
							  if (err) console.log(err);
							  fs.writeFile(__dirname+"/data/groups.csv", csv, function(err) {
							    if (err) throw err;*/

							    											   	//fs.writeFile(__dirname+"/data/graphe.json", JSON.stringify({"nodes":sortedNodes,"links":links,"groups":libGroups.groups}), function(err) {
