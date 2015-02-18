var cheerio = require("cheerio");
var async = require("async");
var fs = require("fs");
var _ = require("lodash");
var db = require("../database.js");

//var Call = require('../../models/call.js');
//var Def = require('../../models/def.js');

var Log = require("log");
//var log = new Log('info',fs.createWriteStream('dependency.log'));
var log = {info:function(){}}


var filesVarFuncList = {};
var filesCalls = {};

var depClass = module.exports = {
	analyze: function(cbDepClass){
		cbDepClass();
	},
	analyzeOld: function(cbDepClass){

		db.findCalls({},function(calls){

			async.each(calls,function(call,cbCalls){
				if(call.parentid !== null){
					db.findLinks({source:call.parentid,relVar:call.obj},function(links){
						async.each(links,function(link,cb){
							db.findDefs({parentid:link.target},function(defs){
								async.each(defs,function(def,cbDefs){
									var newLink = [];
									newLink.source = call.nodeid;
									newLink.target = def.nodeid;

									db.addLinksAsync(newLink,function(err,newLinkAdded){
										cbDefs();
									})
								},function(){
									cb();
								});
							});
							
						},function(){
							cbCalls();
						});
					});
				}
				else{
					cbCalls();
				}

			},function(){
				cbDepClass();
			});
		});

	},
	analyzeOld2: function(cbDepClass){


		db.findNodes({group:"js"},function(nodesList){
    		
    		async.each(nodesList,function(node,cbNode){

    			// Find all func and var Def
    			depClass.getVarFuncDef(node.name,function(err,varFuncList){
    				// Find all Func and var Call
    				depClass.getVarFuncCall(node.name,function(err,callList){


    					//var Call = new Call({id:node.id,name:node.name,obj:,func:});

    					console.log(varFuncList);


	    				filesVarFuncList[node.name] = varFuncList;
	    				filesCalls[node.name] = callList;
	    				// For all calls
	    				async.each(_.keys(callList),function(callObj,cbCall){
	    					

	    					// For all Function Calls
	    					async.each(callList[callObj],function(callFunc,cbcallObj){

	    						console.log(callObj+callFunc);
	    						
	    						/*
	    							console.log(node._id+" | "+callObj);
	    							
	    							// Find Links of that file with that Function object
	    							db.findLinks({source:node._id.toString(),relVar:callObj},function(links){


	    								async.each(links,function(link,cbLinks){
	    								
	    								

												//Find nodes that have Function object
												db.findNodes({_id:link.target},function(foundNode){
													console.log(foundNode);

													// Find nodes that have Function call
													async.each(filesVarFuncList[foundNode.name],function(link,cbLinks){

													},function(){
														cbLinks();	
													});
													
												});
											

										},function(){
												cbcallObj();
	    								});
										
									});
									
								*/

	    					

	    						
	    					},function(){
		    					cbCall();	
		    				});

	    					//
	    					
	    				},function(){
	    					cbNode();	
	    				});

	    				
    				});
    			});

				


    		},function(){
    			//console.log(filesCalls);
    			cbDepClass();
    		});


    		
    	});



	},
	getFuncDef: function(parent,relVar,relFunc,cbGetFunc){
		console.log("FIND LINK",{source:parent,relVar:relVar});
		db.findLinks({target:parent,relVar:relVar},function(link){
			console.log("linkFound",link);
			cbGetFunc(link);
		});
	},
	getVarFuncDef: function(name,cb){
		db.findNodesProj({rootParent:name,group: {$in: ["js-function"]}},{"rawName":1},function(nodesList){
    		cb(null,_.groupBy(nodesList,"rawName"));
    	});
	},
	getVarFuncCall: function(name,cb){
		db.findNodesProj({rootParent:name,group: {$in: ["js-method-call"]}},{"rawName":1,"rawValue":1},function(nodesList){
    		cb(null,_.groupBy(nodesList,"rawName"));
    	});
	}
}