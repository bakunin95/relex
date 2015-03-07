var _ = require('underscore')._;
var async = require("async");


var parsersHelper = require("../parsersHelper");


module.exports = [{	    type: "ast",
						id: "jQuery1",
						active: true,
	                    query:{callee:{object:{name:"$"},property:{name:"ajax"}}},
	                    group: "ajax",
	                    parse:function(node,parent){
	                    	var newNode = {};
	                    	newNode.name = parent.name + "::" + parsersHelper.getCount("ajax");	
	                    	newNode.data = JSON.stringify(node);
	                    	return newNode;
	                    },
	                    after: function(node,parent,cb){
	                    	var url = "";
	                    	var data = JSON.parse(node.data);


	                    	if(!_.isUndefined(data.arguments) && !_.isUndefined(data.arguments[0]) && !_.isUndefined(data.arguments[0].properties)){
	                    		parsersHelper.getAjaxUrl(data.arguments[0].properties,node,function(ajaxUrl){	                    			 
									if(!_.isUndefined(ajaxUrl)){
										parsersHelper.addNode({name:ajaxUrl},node,{},function(){	       
							        		cb();	
										});	
									}
									else{
										cb();
									}
	                    		});	
							}
							else{
								cb();
							}

	                    }
	                },
	                ,
	                 {	
	                	type: "ast",
	                	id: "jQuery2",
	                	active: true,
	                    query:{callee:{object:{name:"$"},property:{name:"post"}}},
	                    group: "ajax",
	                    parse: function(node,parent){
	                    	var newNode = {};
	                    	newNode.data ="";
	                    	if(!_.isUndefined(node)){
		                    	newNode.data = JSON.stringify(node);
		                    }
		                    	newNode.name = parent.name + "::" + parsersHelper.getCount("post");	

	                    	return newNode;
	                    },
	                    after: function(node,parent,cb){
	                    	var url = "";
	                    	var data = JSON.parse(node.data);


	                    	if(!_.isUndefined(data.arguments) && !_.isUndefined(data.arguments[1]) && !_.isUndefined(data.arguments[1].properties)){
	                    		parsersHelper.getAjaxUrl(data.arguments[1].properties,node,function(ajaxUrl){	                    			 
									if(!_.isUndefined(ajaxUrl)){
										parsersHelper.addNode({name:ajaxUrl},node,{},function(){	       
							        		cb();	
										});	
									}
									else{
										cb();
									}
	                    		});	
							}
							else{
								cb();
							}

	                    }
	                },
	                {	
	                	type: "ast",
	                	id: "jQuery3",
	                	active: true,
	                    query:{callee:{object:{name:"$"},property:{name:"get"}}},
	                    group: "ajax",
	                    /*name: function(node,parent){


	                        var name = node.arguments[0].value;
	                    	name = parsersHelper.correctPathSync(name,parent);


	                    	if(_.isUndefined(name)){
	                    		name = parent.name+"::"+parsersHelper.getCount("get");
	                    	}

	                        return name;
	                    },*/
	                    parse: function(node,parent){
	                    	var newNode = {};
	                    	newNode.data = JSON.stringify(node);
	                    	newNode.name = parent.name + "::" + parsersHelper.getCount("post");	
	                    	return newNode;
	                    },
	                    after: function(node,parent,cb){
	                    	var data = JSON.parse(node.data);


	                    	/*async.each(data.arguments[1].properties,function(property,cbRel){
	                    		var newNode = {};                    		
	                    		newNode.group = "js-variable";
	                    		newNode.name = node.name +"::"+property.key.name;
	                    		newNode.rawName = property.key.name;
	                    		newNode.rawValue = property.value.value;
                    			parsersHelper.addNode(newNode,node,{},function(){	
						        	cbRel();	
								});	
	                    	},function(){*/




	                    		//parsersHelper.addNode({name: "type : get", rawValue:"GET", rawName:"Type",group:"js-variable"},node,{},function(){	
						        		
								

	                    		

		                    		if(data.arguments[0].type === "Literal" && !_.isUndefined(url)){
		                    			var url = data.arguments[0].value;
			                    		url = parsersHelper.correctPathSync(url,parent);
			                    		parsersHelper.addNode({name:url},node,{},function(){	           
								        	cb();	
										});	 
	                    			}
	                    			else{
	                    				cb();
	                    			}
								//});	                   		
	                    	//});
	                    },
	                    rawName: ['id.name']
	                },
	                {	
	                	type: "ast",
	                	id: "jQuery4",
	                	active: true,
	                    query:{callee:{object:{name:"$"},property:{name:"getScript"}}},
	                    group: "ajax",
	                    name: function(node,parent){
	                    	var name = node.arguments[0].value;

	                    	if(_.isUndefined(name)){
	                    		name = parent.name+"::"+parsersHelper.getCount("getScript");
	                    	}
	                        return name;
	                    },
	                    rawName: ['id.name']
	                },
	                 {	
	                 	type: "ast",
	                 	id: "jQuery5",
	                	active: true,
	                    query:{callee:{object:{name:"$"},property:{name:"getJSON"}}},
	                    group: "ajax",
	                    name: function(node,parent){
	                    	var name = node.arguments[0].value;

	                    	if(_.isUndefined(name)){
	                    		name = parent.name+"::"+parsersHelper.getCount("getJSON");
	                    	}
	                        return name;
	                    },
	                    rawName: ['id.name']
	                },
	                {	
	                 	type: "ast",
	                	active: true,
	                	id: "jQuery6",

	                    query:{callee:{object:{callee:{name:"$"}},property:{name:"load"}}},
	                    group: "ajax",
	                    name: function(node,parent){

	                    	return parsersHelper.getCount("ajax");
	                    },
	                    parse: function(node,parent){
	                    	var newNode = {};
	                    	newNode.data = JSON.stringify(node);
	                    	return newNode;
	                    },
	                    after: function(node,parent,cb){
	                    	var data = JSON.parse(node.data);

	                    	/*async.each(data.arguments[1].properties,function(property,cbRel){
                    			cbRel();
                    			console.log(property.key.name);
	                    		var newNode = [];                    		
	                    		newNode.group = "js-variable";
	                    		newNode.name = node.name +"::"+property.key.name;
	                    		newNode.rawName = property.key.name;
	                    		newNode.rawValue = property.value.value;
                    			parsersHelper.addNode(newNode,node,{},function(){	
						        	cbRel();	
								});	
	                    	},function(){*/


	                    		var url = data.arguments[0].value;

	                    		if(!_.isUndefined(url)){

		                    		url = parsersHelper.correctPathSync(url,parent);


		                    		parsersHelper.addNode({name:url},node,{reverse:true},function(err,nodeadded){
							        	cb();	
									});	   
								}
								else{
									cb();
								}                 		
	                    	//});
	                    }
	                }];




/*
		                    	async.each(data.arguments[0].properties,function(property,cbRel){

		                    		var name = "";
		                    		var newNode = {};


		                    		

		                    		if(!_.isUndefined(property.key) && !_.isUndefined(property.value) && property.key.type == "Identifier"){
		                    			//newNode.rawName = property.key.name;
		                    			//newNode.name = node.name +"::"+newNode.rawName;

		                    			console.log(newNode.name);

		                    			

		                    			if(property.value.type === "Literal" || property.value.type === "Identifier"){



		                    				if(property.key.name == "url"){
			                    				url = property.value.value;

			                    				url = parsersHelper.correctPathSync(url,parent);
			                    				parsersHelper.addNode({name:url},node,{},function(){	       
								        			cbRel();	
												});	
			                    			}
			                    			else{
			                    				cbRel();
			                    			}

			                    			
		                    				newNode.rawType = (typeof property.value.value);
		                    				newNode.rawValue = property.value.value;
		                    				newNode.group = "js-variable";
		                    				console.log("name",newNode.rawName);
		                    				parsersHelper.addNode(newNode,node,{},function(){	
									        	cbRel();	
											});	
		                    			}
		                    			else{
		                    				cbRel();	
		                    			}

		                    		}
		                    		else{
		                    			cbRel();
		                    		}


		                    		
		                    		

	                    			
		                    	},function(){

		                    		

		                    		cb();

		                    		
		                    	});*/