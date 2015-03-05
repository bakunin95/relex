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
		                    	async.each(data.arguments[0].properties,function(property,cbRel){
	                 			var name = "";
		                    		var newNode = {};
		                    		if(!_.isUndefined(property.key) && property.key.name == "url"){
		                    			name = property.key.name;
		                    			url = property.value.value;
		                    		}
		                    		else{
		                    			name = "undefined";
		                    		}
		                    		newNode.group = "js-variable";
		                    		newNode.name = node.name +"::"+name;
		                    		newNode.rawName = name;

		                    		if(!_.isUndefined(property.value.value)){
		                    			newNode.rawValue = property.value.value;
		                    		}
		                    		else{
		                    			newNode.rawValue = "";
		                    		}

	                    			parsersHelper.addNode(newNode,node,{},function(){	
							        	cbRel();	
									});	
		                    	},function(){


		                    		url = parsersHelper.correctPathSync(url,parent);
									if(!_.isUndefined(url)){
										parsersHelper.addNode({name:url},node,{},function(){	       
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
	                    	var data = JSON.parse(node.data);
	                    	
	                    	if(!_.isUndefined(data) && !_.isUndefined(data.arguments) && !_.isUndefined(data.arguments[1]) && !_.isUndefined(data.arguments[1].properties)){
	                    		console.log(data.arguments[1]);
		                    	async.each(data.arguments[1].properties,function(property,cbRel){
		                    		
		                    		if(!_.isUndefined(property)){
			                    		var newNode = {};           

			                    		console.log(property);         		
			                    		newNode.group = "js-variable";
			                    		newNode.name = node.name +"::"+property.key.name;
			                    		newNode.rawName = property.key.name;
			                    		newNode.rawValue = property.value.value;
		                    			parsersHelper.addNode(newNode,node,{},function(){	
								        	cbRel();	
										});	
									}
									else{
										cbRel();
									}
		                    	},function(){
	                  		
		                    			try{
			                    			var url = data.arguments[0].value;
			                    			if(!_.isUndefined(url)){
					                    		url = parsersHelper.correctPathSync(url,parent);
					                    		parsersHelper.addNode({name:url},node,{},function(){	           
										        	cb();	
												});	
											}
											else{
												cb();
											}
										}
										catch(e){
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


	                    		parsersHelper.addNode({name: "type : get", rawValue:"GET", rawName:"Type",group:"js-variable"},node,{},function(){	
						        		
								

	                    		var url = data.arguments[0].value;
	                    		url = parsersHelper.correctPathSync(url,parent);

	                    		console.log(url);
	                    		parsersHelper.addNode({name:url},node,{},function(){	           
						        	cb();	
								});	 
								});	                   		
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