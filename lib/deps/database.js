var path = require("path"),
    url = require("url"),
    fs = require("fs"),
    async = require("async"),
    _ = require('underscore')._;

var Log = require("log");
var log = new Log('info',fs.createWriteStream('database.log'));
//var log = {info:function(){}}

var libGroups = require('./languages/libGroups');

var Link;
var Node;
var linkSchema = require("../models/link.js")
var nodeSchema = require("../models/node.js")
var callSchema = require("../models/call.js")
var defSchema = require("../models/def.js")

var sequelize;

var database = module.exports = {
	nodeCount:0,
	nodes: [],
	links: [],
	startServer: function(cbServer){

			log.info('Loading database');
			log.info('Model loaded');

			var Schema = require('jugglingdb').Schema;
			var schema = new Schema('sqlite3', {
			    database: ':memory:'
			});

			Link = linkSchema(schema);	
			Node = nodeSchema(schema);
			Call = callSchema(schema);
			Def = defSchema(schema);

		 	// Define the schema in the DB if it is not there		
		    schema.automigrate(function(msg){
				cbServer();
			}); 

	},
	findNodes: function(filter,cbFind){
		log.info('findNodes',filter);

		Node.all({where: filter, order:"time"},function(err,docs) {
			if(docs !== null){
			    	cbFind(docs);
			    }
			    else{
			    	cbFind([]);
		    }
		})
	},
	findNodesProj: function(filter,proj,cbFind){
		Node.find(filter,proj).sort({time:1}).exec(function (err, docs){
			database.errorHandler(err);
		    if(docs !== null){
		    	cbFind(docs);
		    }
		    else{
		    	cbFind([]);
		    }
		});
	},
	findNodesById: function(filter,cbFind){
		log.info('findNodesById',filter);






		Node.all({order:"id"},function (err, docs){
			database.errorHandler(err);
		    if(docs !== null){
		    	cbFind(docs);
		    }
		    else{
		    	cbFind([]);
		    }
		});



	},
	getGroupInfo: function(group){
		var libGroup = _.find(libGroups.groups,{keyword:group})
		return libGroup;
	},
	groupCount: function(node,cbGroup){
		var infoGroup = null;
		var key = 0;
		async.eachSeries(libGroups.groups, function(group,cbCounter){	
			if(group.keyword == node.group){
				libGroups.groups[key].count++;
				infoGroup = {	"color":libGroups.groups[key].color,
								"text": libGroups.groups[key].text,
								"foci": libGroups.groups[key].foci
							 };
			}
    		key++;
		cbCounter();
    	},function(err){

    		if(infoGroup == null){
    			key = libGroups.groups.length-1;
    			libGroups.groups[key].count++;
				infoGroup = {	"color":libGroups.groups[key].color,
								"text": libGroups.groups[key].text,
								"foci": libGroups.groups[key].foci
							 };
    			
    		}
    		cbGroup(err,infoGroup);
    	});

	},
	fixIdentities: function(done){

		var key = 0;
		async.eachSeries(libGroups.groups, function(group,cbCounter){	
			Node.count({"group":group.keyword},function(err,count){
				libGroups.groups[key].count = count;
				key++;
				cbCounter();
			});

		},function(){
			done();
		});
		
	},
	findOneNode: function(filter,cbFind){
		log.info('findOneNodes',filter);


		Node.find({where:{"name":filter.name}},function(docs) {
			 if(docs !== null && docs.length>0){
		    	cbFind(docs[0]);
		    }
		    else{
		    	cbFind([]);
		    } 

		});

	},
	findLinks: function(filter,cbFind){
		log.info('findLinks',filter);


		Link.all({},function (err, docs){
			database.errorHandler(err);
		    if(docs !== null){
		    	cbFind(docs);
		    }
		    else{
		    	cbFind([]);
		    }
		});


	},
	findCalls: function(filter,cbFind){
		log.info('findCalls',filter);

		Call.all(filter,function (err, docs){
			database.errorHandler(err);
		    if(docs !== null){}

		});    	


		/*database.links.find(filter).toArray(function(err, docs) {
			database.errorHandler(err);
		    if(docs != null && docs.length>0){
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
		    	cbFind(docs);
		    }
		    else{
		    	cbFind([]);
<<<<<<< HEAD
		    }
		});
	},
	findDefs: function(filter,cbFind){
			log.info('findDefs',filter);

			Def.all(filter,function (err, docs){
				database.errorHandler(err);
			    if(docs !== null){
			    	cbFind(docs);
			    }
			    else{
			    	cbFind([]);
			    }
			});*/

	},
	findOneLink: function(filter,cbFind){	
		log.info('findOneLink',filter);

		Link.find({where:{"name":filter.name}},function(docs) {
			 if(docs !== null && docs.length>0){
		    	cbFind(docs[0]);
		    }
		    else{
		    	cbFind([]);
		    } 

		});

	},
	nodeUpdate: function(node,cbUpdateDone){
		log.info('nodeUpdate',node.name);
		/*
		node = node.toObject();
		delete node._id;
		Node.findOneAndUpdate({name:node.name},node,function(err, res) {
			database.errorHandler(err); 
		    cbUpdateDone();
		}); 
		*/






	},
	linkUpdate: function(filter,update,cbUpdateDone){
		log.info('linkUpdate',filter);
/*
		link = node.toObject();
		delete link._id;
		Node.findOneAndUpdate({source:node.name},node,function(err, res) {
			database.errorHandler(err); 
		    cbUpdateDone();
		});*/

		Link.find({where:{"name":filter.name}},function(docs) {
			 if(docs !== null && docs.length>0){

			 	Link.save(update,docs[0],function(err,newDoc){
			 		cbFind(newDoc);
			 	});
		    	
		    }
		    else{
		    	cbFind([]);
		    } 

		});

	},
	addAssetAsync: function(node,parent,link,cbAddAsset){
		log.info('addAssetAsync parent',parent.name);
		log.info('addAssetAsync node',node.name);
		log.info('addAssetAsync link',link);

		if(_.isUndefined(node.group)){
	    	node.group = database.assignGroupForNonExisting(node.name);  

	    }    
 		groupInfo = database.getGroupInfo(node.group);

	    node.groupColor = groupInfo.color;
	    node.groupText = groupInfo.text;
	    node.groupFoci = groupInfo.foci;
	   
		Node.findOrCreate({where: {name: node.name}},node,function(err,nodeAdded){

			nodeAdded.updateAttribute("data",node.data,function(){

			


				
				link.source = parent.id;
			    link.target = nodeAdded.id;

			    if(link.reverse === true){
			    	var temp = link.source;
			    	link.source = link.target;
			    	link.target = temp;
			         delete link.reverse;
			    }

			    if(link.source !== link.target){

			    	Link.findOrCreate({where:{source:link.source,target:link.target}},link,function(err,newLink){
			    		cbAddAsset(null,nodeAdded);
			    	});

			  	}
			  	else{
			  		cbAddAsset(null,nodeAdded);
			  	}

		  	});

		});


		/*
		Node.find({where: {name: node.name}},function(err,found){

			async.waterfall([
				    function(cbFirst){
				    	if(found === null){
				    		if(_.isUndefined(node.group)){
						    		node.group = database.assignGroupForNonExisting(node.name);    	
						    }    

						    groupInfo = database.getGroupInfo(node.group);

						    	node.groupColor = groupInfo.color;
						    	node.groupText = groupInfo.text;
						    	node.groupFoci = groupInfo.foci;


								Node.create(node, function (err, newNode) {
									database.errorHandler(err); 
									cbFirst(err,newNode);
								});

							


				    	}
				    	else{
				    		cbFirst(null,found);
				    	}

				    },
				    function(nodeAdded,cbSec){ 

				    	
				    	link.source = parent.id;
					    link.target = nodeAdded.id;


					    if(link.reverse === true){
					    	var temp = link.source;
					    	link.source = link.target;
					    	link.target = temp;
					         delete link.reverse;
					    }

					    if(link.source !== link.target){
						  	Link.find({where:{source:link.source,target:link.target}},function(err,foundLink){
						  		if(foundLink === null){
						  			Link.create(link,function(err,newLink){
						  				cbAddAsset(null,nodeAdded);
						  			});
						  		}
						  		else{
						  			cbAddAsset(null,nodeAdded);
						  		}
						  	});

					  	}
					  	else{
					  		cbAddAsset(null,nodeAdded);
					  	}

					  
				    }
				]);
			});*/

	},
	correctPath: function(filePath,parent,cbCorrectPath){	
		// Relative path must be converted to absolute
    	if(filePath == null || typeof filePath !== "string" || parent == null){
    		cbCorrectPath(null,filePath);
    	}
    	else{

    		if(filePath.substring(0, 2) == "./"){
                filePath = filePath.substring(2);
            }


			database.findOneNode({"name":filePath},function(foundNode1){
				if(!_.isUndefined(foundNode1)){
					cbCorrectPath(null,filePath);	
				}
				else{

					if(_.isUndefined(parent.folder) == false){
						var mixedPath = path.normalize(parent.folder +"/"+ filePath);

					}
					else{
						return cbCorrectPath(null,filePath);
						
					}


					mixedPath = mixedPath.replace(/\\/g,"\/" ).replace("//", "/");	


					database.findOneNode({"name":mixedPath},function(foundNode2){
						if(!_.isUndefined(foundNode2)){
							cbCorrectPath(null,mixedPath);
						}
						else{
							cbCorrectPath(null,filePath);
						}	
					});

				}
			});
		}
		
    },
	errorHandler: function(err){
		if(err){
			err.file =  "database.js";
			console.log("Error",err);
		}
	},
	addLinksAsync: function (link,cbLinkAsync) {

		Link.find({where:{source:link.source,target:link.target}},function(err,foundLink){
	  		if(foundLink === null){
	  			Link.create(link,function(err,newLink){
	  				cbLinkAsync(null,nodeAdded);
	  			});
	  		}
	  		else{
	  			cbLinkAsync(null,nodeAdded);
	  		}
	  	});

    },
	addNodesAsync: function (node,cbAddNode) {


		if(_.isUndefined(database.isFirst)){
			database.isFirst = true;
			node.id = 0;
		}

	    
		if(node.exist !== true){
    		node.exist = false;
    	}

    	if(node.exist){
    		var infoFile = database.getInfoFile(node.name);

    		node.file = infoFile.file;
    		node.folder = infoFile.folder;

    	}
    	else if(_.isUndefined(node.group)){
    		node.group = database.assignGroupForNonExisting(node.name);    	
    	}
		

		groupInfo = database.getGroupInfo(node.group);

    	node.groupColor = groupInfo.color;
    	node.groupText = groupInfo.text;
    	node.groupFoci = groupInfo.foci;

		Node.create(node, function (err, newNode) {
			database.errorHandler(err); 

			  cbAddNode(null,newNode);
		})


    },
	updateNodeAsync: function (target,cbUpdateNode){
		Console.log("#######Deprecated");
		/*
    	db.nodeUpdate(target,function (err){
			database.errorHandler(err);      	
				cbUpdateNode(err);		
		});*/
    },
    getInfoFile: function(filePath){
    	if(filePath !== null && (typeof filePath == "string")){
	    	var rePattern = new RegExp("^(.+)/([^/]+)");
			var arrMatches = filePath.match(rePattern);	
			if(arrMatches !== null && arrMatches.length>=2){
				return {file:arrMatches[2],folder:arrMatches[1]};
			}
			else{
				return {file:filePath,folder:""};			
			}
		}
		else{
			return {file:filePath,folder:""};			
		}
    },
    getExtension: function(correctedPath){
		var filename = "";
		try{
			filename = url.parse(correctedPath).pathname.split(".").pop().toLowerCase();
		}catch(e){}
		return filename;
	},
    assignGroupForNonExisting: function(filePath){

		var extension = database.getExtension(filePath);
		var group = "unknown";

		if(filePath == null || typeof filePath !== "string" || filePath == true || _.isUndefined(filePath)){
			return group;
		}

		if (filePath.substring(0, 1) == "#"){
			group = "anchor";
		}
		else if (filePath.substring(0, 7) == "mailto:"){
			group = "email";
		}
		else{
			switch(extension){
				case "php":
					group = "php";
				break;
				case "html":
				case "htm":
				case "":
				case "/":
					group = "html";
				break;
				case "js":
						if ((filePath.substring(0, 7) == "http://") || (filePath.substring(0, 8) == "https://")){
							group = "ws";
						}
						else{
							group = "js-unreachable";
						}
				break;
				case "css":
					if ((filePath.substring(0, 7) == "http://") || (filePath.substring(0, 8) == "https://")){
							group = "ws";
						}
						else{
							group = "css-unreachable";
						}
				break;

			}
		}		
		return group;
	}
};