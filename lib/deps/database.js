var path = require("path"),
    url = require("url"),
    fs = require("fs"),
    async = require("async"),
    _ = require('underscore')._;

<<<<<<< HEAD
var Log = require("log");
//var log = new Log('info',fs.createWriteStream('database.log'));
var log = {info:function(){}}

var libGroups = require('./languages/libGroups');

var Link;
var Node;
var linkSchema = require("../models/link.js")
var nodeSchema = require("../models/node.js")
var callSchema = require("../models/call.js")
var defSchema = require("../models/def.js")

var sequelize;

var database = module.exports = {
	EXPORT_CSV: true,
=======
var MongoClient = require('mongodb').MongoClient;
var Log = require("log");
var log = new Log('info',fs.createWriteStream('database.log'));
var libGroups = require('./languages/libGroups');

log.info('Loading database');

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var mockgoose = require('mockgoose');

mockgoose(mongoose);




var Node = require('../models/Node');
var Link = require('../models/Link');

log.info('Model loaded');


var database = module.exports = {
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
	nodeCount:0,
	nodes: [],
	links: [],
	startServer: function(cbServer){
<<<<<<< HEAD

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
=======
		log.info('start server');

		Node.remove(function(err, p){
		  Link.remove(function(err, p){
		    cbServer();

			});  

		});
	},
	findNodes: function(filter,cbFind){
				log.info('findNodes',filter);

		Node.find(filter).sort({time:1}).exec(function (err, docs){
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
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
<<<<<<< HEAD



		Node.all({order:"id"},function (err, docs){
=======
		Node.find(filter).sort({id:1}).exec(function (err, docs){
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
			database.errorHandler(err);
		    if(docs !== null){
		    	cbFind(docs);
		    }
		    else{
		    	cbFind([]);
		    }
		});
<<<<<<< HEAD


	},
	getGroupInfo: function(group){
		var libGroup = _.find(libGroups.groups,{keyword:group})
		return libGroup;
=======
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
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
<<<<<<< HEAD

		done();
		
	},
	fixIdentitiesOld: function(done){
		log.info('fixIdentities');

		var newId = 0;





		Node.find({}).sort({time:1}).exec(function (err, docs){




=======
		log.info('fixIdentities');

		var newId = 0;
		Node.find({}).sort({time:1}).exec(function (err, docs){
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
			database.errorHandler(err);
		    if(docs !== null && !_.isUndefined(docs)){
		    	
		    	async.eachSeries(docs,function(currentNode,cbEach){
<<<<<<< HEAD

=======
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
		    		currentNode.id = newId++;
		    		var currNodeId = currentNode._id.toString();
					
					database.groupCount(currentNode,function(err,infoGroup){
<<<<<<< HEAD

						currentNode.groupColor = infoGroup.color;
						currentNode.groupText = infoGroup.text;
						currentNode.groupFoci = infoGroup.foci;
=======
						currentNode.infoGroup = infoGroup;
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1

			    		delete currentNode.__v;
				        currentNode.save(function(err, doc) {
				        	database.errorHandler(err);
				        	Link.update({source:currNodeId},{source:currentNode.id},{multi: true},function(err, res) {
								database.errorHandler(err);
				        		Link.update({target:currNodeId},{target:currentNode.id},{multi: true},function(err, res) {
									database.errorHandler(err);
									cbEach();
								}); 							
							}); 
				        });

					
			    	});	


		    	},function(err){
		    		done();
		    	})



		    }
		    else{
		    	done();
		    }
		});


	},
	findOneNode: function(filter,cbFind){
		log.info('findOneNodes',filter);


<<<<<<< HEAD
		Node.find({where:{"name":filter.name}},function(docs) {
			 if(docs !== null && docs.length>0){
=======
		Node.findOne({"name":filter.name}, function(err,docs) { 
			database.errorHandler(err);
		    if(docs !== null && docs.length>0){
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
		    	cbFind(docs[0]);
		    }
		    else{
		    	cbFind([]);
		    } 

		});

<<<<<<< HEAD
=======
		/*database.nodes.find({"name":filter.name}).toArray(function(err, docs) {
		    database.errorHandler(err);
		    if(docs !== null && docs.length>0){
		    	cbFind(docs[0]);
		    }
		    else{
		    	cbFind([]);
		    } 
		  }); */
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
	},
	findLinks: function(filter,cbFind){
		log.info('findLinks',filter);

<<<<<<< HEAD
		Link.all({},function (err, docs){
=======
		Link.find(filter,function (err, docs){
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
			database.errorHandler(err);
		    if(docs !== null){
		    	cbFind(docs);
		    }
		    else{
		    	cbFind([]);
		    }
		});

<<<<<<< HEAD
	},
	findCalls: function(filter,cbFind){
		log.info('findCalls',filter);

		Call.all(filter,function (err, docs){
			database.errorHandler(err);
		    if(docs !== null){
=======



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
			});
=======
		    }	    
		}); */
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
	},
	findOneLink: function(filter,cbFind){	
		log.info('findOneLink',filter);

<<<<<<< HEAD
		Link.find({where:{"name":filter.name}},function(docs) {
			 if(docs !== null && docs.length>0){
		    	cbFind(docs[0]);
		    }
		    else{
		    	cbFind([]);
		    } 

		});
=======
		database.links.find(filter).toArray(function(err, docs) {
			database.errorHandler(err);
			if(docs !== null && docs.length>0){
				cbFind(docs[0]);
			}
			else{
				cbFind([]);
			}
		}); 
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
	},
	nodeUpdate: function(node,cbUpdateDone){
		log.info('nodeUpdate',node.name);

		node = node.toObject();
		delete node._id;
		Node.findOneAndUpdate({name:node.name},node,function(err, res) {
			database.errorHandler(err); 
		    cbUpdateDone();
		}); 

<<<<<<< HEAD

=======
/*
		database.nodes.update({"_id":node._id},node,function(err, res) {
		    cbUpdateDone();
		}); */
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
	},
	linkUpdate: function(filter,update,cbUpdateDone){
		log.info('linkUpdate',filter);

		link = node.toObject();
		delete link._id;
		Node.findOneAndUpdate({source:node.name},node,function(err, res) {
			database.errorHandler(err); 
		    cbUpdateDone();
		}); 
	},
<<<<<<< HEAD
	addAssetAsync: function(node,parent,link,cbAddAsset){
		log.info('addAssetAsync parent',parent.name);
		log.info('addAssetAsync node',node.name);
		log.info('addAssetAsync link',link);
		 
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

});



=======
	addAssetAsync: function(parent,node,link,cbAddAsset){
		log.info('addAssetAsync parent',parent.name);
		log.info('addAssetAsync node',node.name);
		log.info('addAssetAsync link',link);


/*
		Node.findOne({"name":node.name}, function(err,nodeFound) { 
			//database.errorHandler(err);
		    
		    if(nodeFound == null){
		    	if(_.isUndefined(node.group)){
		    		node.group = database.assignGroupForNonExisting(node.name);    	
		    	}

				Node.create(node, function (err, newNode) {
					database.errorHandler(err); 
					console.log(newNode);
					link.source = parent._id;
		  			link.target = newNode._id;


		  			Link.findOne({source:link.source,target:link.target},function(err,linkFound){
		  				if(linkFound == null){
		  					Link.create(link,function(err,linkAdded){
		  						cbAddAsset(null,newNode);
		  					});
		  				}
		  				else{
		  					cbAddAsset(null,newNode);	
		  				}
		  			});

					
				})
		    }
		    else{
		    	link.source = parent._id;
		  		link.target = nodeFound._id;

		    	Link.findOne({source:link.source,target:link.target},function(err,linkFound){
		  				if(linkFound == null){
		  					Link.create(link,function(err,linkAdded){
		  						cbAddAsset(null,nodeFound);
		  					});
		  				}
		  				else{
		  					cbAddAsset(null,nodeFound);	
		  				}
		  			});
		    }	

		});*/




		/*
		if(_.isUndefined(node.group)){
			console.log(node);
    		node.group = database.assignGroupForNonExisting(node.name);    	
    	}
*/




		Node.findOneAndUpdate({name:node.name}, node, {upsert:true}, function(err, nodeAdded){
		  database.errorHandler(err);

		  //console.log(nodeAdded);

		  	if(_.isUndefined(nodeAdded.group)){
		  		//delete nodeAdded.__v;
		  		//delete nodeAdded._id;
    		nodeAdded.group = database.assignGroupForNonExisting(nodeAdded.name);    
    		nodeAdded.save();	
    	}

		 
		    link.source = parent._id.toString();
		    link.target = nodeAdded._id.toString();

		  	Link.findOneAndUpdate({source:link.source,target:link.target}, link, {upsert:true}, function(err, link){
		  		database.errorHandler(err);

		  		setImmediate(cbAddAsset(null,nodeAdded));
		  	});
			
			
		});


		/*
		database.nodes.save(node,function(err,nodeAdded){
			link.source = parent.id;
			link.target = node.id;
			database.links.save(link,function(err,res){
				cbAddAsset(null,nodeAdded);
			});
		});
		*/




		//database.addNodesAsync(node,function(err,nodeAdded){
		//	database.errorHandler(err);
			//database.addLinksAsync(link,parent,nodeAdded,function(err,linkAdded){
			//    database.errorHandler(err);							
			//	cbAddAsset(null,nodeAdded);
		//	});		
		//});
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
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
<<<<<<< HEAD
=======
			//	console.log("#####GNAGNA");
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1

			database.findOneNode({"name":filePath},function(foundNode1){
				if(!_.isUndefined(foundNode1)){
					cbCorrectPath(null,filePath);	
				}
				else{

<<<<<<< HEAD
					if(_.isUndefined(parent.folder) == false){
						var mixedPath = path.normalize(parent.folder +"/"+ filePath);
=======
					if( !_.isUndefined(parent.infoFile) && !_.isUndefined(parent.infoFile.parentFolder)){	
						var mixedPath = path.normalize(parent.infoFile.parentFolder +"/"+ filePath); 
					}
					else if(_.isUndefined(parent.infoFile) == false && _.isUndefined(parent.infoFile.folder) == false){
						var mixedPath = path.normalize(parent.infoFile.folder +"/"+ filePath);
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
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
<<<<<<< HEAD
=======


					/*database.findOneNode({"name":parent.name},function(parent){
						if( _.isUndefined(parent.infoFile) == false && _.isUndefined(parent.infoFile.parentFolder) == false){	
							var mixedPath = path.normalize(parent.infoFile.parentFolder +"/"+ filePath); 
						}
						else if(_.isUndefined(parent.infoFile) == false && _.isUndefined(parent.infoFile.folder) == false){
							var mixedPath = path.normalize(parent.infoFile.folder +"/"+ filePath);
						}
						else{
							cbCorrectPath(null,filePath);
							return;
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
					});*/

>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
				}
			});
		}
		
    },
	errorHandler: function(err){
		if(err){
			err.file =  "database.js";
<<<<<<< HEAD
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

=======
			//err.func = func;
			console.log("Error",err);
		}
	},
	/*addLinksAsync: function (link,source,target,cbLinkAsync) {
    	link.source = source._id.toHexString();
		link.target = target._id.toHexString();
    	if(source._id !== target._id){
    		database.findOneLink({"source":source._id.toHexString(),"target":target._id.toHexString()},function(res){
    			if(res.length>0){
    				cbLinkAsync();
    			}
    			else{
    				if((source.group == "html" && target.group == "js") ){
		    			if (_.isUndefined(target.infoFile) == false){
		    				target.infoFile["parentFolder"] = source.infoFile.folder;
		    			}
		    			else{
		    				target["infoFile"] = {"parentFolder":source.infoFile.folder};
		    			}
						database.nodeUpdate(target,function (err){
							database.errorHandler(err);
							database.links.insert(link,function(err,result){
					    		cbLinkAsync();
					    	});
						});
					}
					else{
						database.links.insert(link,function(err,result){
				    		cbLinkAsync();
				    	});						
					}
    			}
    		});
    	}
    	else{
    		cbLinkAsync();
    	}
    },*/
	addNodesAsync: function (node,cbAddNode) {
		/*process.nextTick(function() {

	    	if(node.exist !== true){
	    		node.exist = false;
	    	}

	    	if(node.exist){
	    		node.infoFile = database.getInfoFile(node.name);
	    	}
	    	else if(_.isUndefined(node.group)){
	    		node.group = database.assignGroupForNonExisting(node.name);    	
	    	}
        
	    	database.nodes.save(node,function(err,result){
	    		console.log("err",err);
	    		console.log("res",result);

				cbAddNode(null,result);

	    		if(err !== null && err.code == "11000"){
	    			database.findOneNode({"name":node.name},function(foundNode1){
	    				cbAddNode(null,foundNode1);
	    			});
	    		}
	    		else{
	    			newNode = result;  			
					cbAddNode(null,newNode);
	    		}
	    	});
		});*/
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
	    
		if(node.exist !== true){
    		node.exist = false;
    	}

    	if(node.exist){
<<<<<<< HEAD
    		var infoFile = database.getInfoFile(node.name);

    		node.file = infoFile.file;
    		node.folder = infoFile.folder;
=======
    		node.infoFile = database.getInfoFile(node.name);
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
    	}
    	else if(_.isUndefined(node.group)){
    		node.group = database.assignGroupForNonExisting(node.name);    	
    	}
		

<<<<<<< HEAD
		groupInfo = database.getGroupInfo(node.group);

    	node.groupColor = groupInfo.color;
    	node.groupText = groupInfo.text;
    	node.groupFoci = groupInfo.foci;

		Node.create(node, function (err, newNode) {
			database.errorHandler(err); 

			  cbAddNode(null,newNode);
		})


=======


		node.id = database.nodeCount++;
		Node.create(node, function (err, newNode) {
			//database.errorHandler(err); 

		  cbAddNode(null,newNode);
		})

>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
    },
	updateNodeAsync: function (target,cbUpdateNode){
    	db.nodeUpdate(target,function (err){
			database.errorHandler(err);      	
				cbUpdateNode(err);		
		});
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