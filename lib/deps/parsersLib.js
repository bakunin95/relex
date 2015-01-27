var requireDir = require('require-dir'),
			 _ = require('underscore')._,
	     async = require("async"),
	     libGroups = require("./languages/libGroups"),
	     fs = require('graceful-fs'),
	     	Datastore = require('nedb');

var db = require("./database.js");



var fs = require('fs');
var Log = require("log");
var log = new Log('info',fs.createWriteStream('relex.log'));


log.info('Loading parsersLib');


var parsersLib = module.exports = {
    pluginsList: new Array(),
    priorities: new Array(),
    runCount:0,
    "sourceCount":0,
    processList: function(cbProcessList){
    	var pluginsList = requireDir("../parsers");

    	pluginsList = _.where(pluginsList,{"active": true});
    	var priorityList = _.uniq(_.sortBy(_.pluck(pluginsList, 'priority')),true);

    	//fs.writeFile("priority.json", JSON.stringify(_.sortBy(pluginsList,'priority'),null,4), function(err) {});




    	var counter = 0;

		async.mapSeries(priorityList, function(currentPriority,cbPriorities){
    		log.info('## Priority start:'+currentPriority);


	    	async.each(_.where(pluginsList,{"priority": currentPriority}), function(currentPlugin,cbPlugins){

	    		//	log.info('Current Plugin running',currentPlugin.name);

	    			 //relationsclass.db


    			db.findNodes(currentPlugin.filter,function(nodesList){
	    				log.info('"@@ Parser executing',currentPlugin.name);


    				if(!_.isUndefined(nodesList) && nodesList.length > 0){

    					async.each(nodesList, function(node,cbNodeUpdt){

		    				currentPlugin.parser(node,function(err,newNode){
		    					parsersLib.errorHandler(err);

			    			//	log.info('Parser parsing node',"["+Math.round(process.memoryUsage().rss / (1024 * 1024))+"mb used] =>"+node.name);

			    				if(newNode !== null){
				    				db.nodeUpdate(newNode,function(err,nodeAdded){

										setImmediate(cbNodeUpdt());		
									});
								}
								else{
									setImmediate(cbNodeUpdt());
								}
			    			});		
	    				},function(err){

	    					//log.info('Plugin finished executing',currentPlugin.name);
	    					//setTimeout(function(){ cbPlugins(); }, 100);
	    					setImmediate(cbPlugins());	    						    			
	    				});
    				}else{
    					log.info('No nodes to parse for ',currentPlugin.name);

    					cbPlugins();
    				}	    				
	    		});


    		}, function(err) {
    			log.info('## Priority done:'+currentPriority);
				parsersLib.errorHandler(err);
				cbPriorities();
			});

		},function(err) {
			parsersLib.errorHandler(err);
			log.info('## All Plugin executed');
			cbProcessList(err);
		});
    },
    errorHandler: function(err){
		if(err){
			err.file =  "parsersLib.js";
			err.func = func;
			console.log("Error",err);
		}
	}
};