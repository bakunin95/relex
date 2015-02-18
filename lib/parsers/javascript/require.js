var async = require("async");
var detective = require('detective');
var detectiveAmd = require('detective-amd');
var parsersHelper = require("../parsersHelper");
var _ = require('underscore')._;


module.exports = [ {    type: "normal", 
						id: "Require1",           
                        active: false,
                        priority:50,
                        parse: function(node,data,cb){

							try{

								var relations = detective.find(data,{"nodes":true});

								
				    			//nodes
				    			
				    			var key = 0;
								async.each(relations.strings, function (relation, cbRel) {

									//console.log("#########",relation);


									
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
                    {   type: "normal", 
                   		id: "Require2",            
                        active: false,
                        priority:50,
                        parse: function(node,data,cb){

                        	try{
				    			var relations = detectiveAmd(data);

								async.each(relations, function (relation, cbRel) {

							        parsersHelper.addNode({name:relation},node,{},function(){	
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
