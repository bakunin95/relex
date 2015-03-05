var async = require("async");
var detective = require('detective');
var detectiveAmd = require('detective-amd');
var parsersHelper = require("../parsersHelper");
var _ = require('underscore')._;
var fs = require("fs");

module.exports = [ {    id: "Require1",           
                        active: false,
                        query:{type:"Program"},
                        parse: function(node,parent,cb){

							try{

								var data = fs.readFileSync(parent.name, "utf8");



								var relations = detective.find(data,{"nodes":true});

								
				    			//nodes
				    			
				    			var key = 0;
								async.each(relations.strings, function (relation, cbRel) {




									console.log("#########",relation);
									cbRel();

									/*
									var relVar = "";

									try{
										relVar = relations.nodes[key].parent.id.name;
									}catch(e){}

									if(_.isUndefined(relVar)){
										relVar = "";
									}
									key++;
							        parsersHelper.addNode({name:relation},node,{relVar:relVar},function(){	
							        	cbRel();	
									});	    

*/


									//node.deps.push({rawName:relations});
									//node.save();
							        
							    },function(err){
							    	cb();
							    });
				    		}
				    		catch(e){
				    			console.log(e);
				    			//detective can't parse this file
				    			cb();
				    		}  
                        }
                    },
                    {   id: "Require2", 
                   		query:{type:"Program"},           
                        active: false,
                        parse: function(node,parent){
                        	node.addAsset = fasle;
                        	try{

                        		var data = fs.readFileSync(parent.name, "utf8");

				    			var relations = detectiveAmd(data);

								async.each(relations, function (relation, cbRel) {

							        parsersHelper.addNode({name:relation},parent,{},function(){	
							        	cbRel();	
									});	    
							        
							    },function(err){
							    	cb();
							    });
				    		}
				    		catch(e){
				    			
				    			//detective can't parse this file
				    			cb();
				    		}  

                        }
                    }];
