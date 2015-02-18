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

	                    	async.each(data.arguments[0].properties,function(property,cbRel){
                 			
	                    		var newNode = {};
	                    		if(property.key.name == "url"){
	                    			url = property.value.value;
	                    		}
	                    		newNode.group = "js-variable";
	                    		newNode.name = node.name +"::"+property.key.name;
	                    		newNode.rawName = property.key.name;

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
	                    	newNode.data = JSON.stringify(node);
	                    	newNode.name = parent.name + "::" + parsersHelper.getCount("post");	
	                    	return newNode;
	                    },
	                    after: function(node,parent,cb){
	                    	var data = JSON.parse(node.data);
	                    	async.each(data.arguments[1].properties,function(property,cbRel){
	                    		var newNode = {};                    		
	                    		newNode.group = "js-variable";
	                    		newNode.name = node.name +"::"+property.key.name;
	                    		newNode.rawName = property.key.name;
	                    		newNode.rawValue = property.value.value;
                    			parsersHelper.addNode(newNode,node,{},function(){	
						        	cbRel();	
								});	
	                    	},function(){
	                    		var url = data.arguments[0].value;
	                    		url = parsersHelper.correctPathSync(url,parent);
	                    		parsersHelper.addNode({name:url},node,{},function(){	           
						        	cb();	
								});	                    		
	                    	});
	                    }
	                },
	                {	
	                	type: "ast",
	                	id: "jQuery3",
	                	active: true,
	                    query:{callee:{object:{name:"$"},property:{name:"get"}}},
	                    group: "ajax",
	                    name: function(node,parent){


	                        var name = node.arguments[0].value;
	                    	name = parsersHelper.correctPathSync(name,parent);


	                    	if(_.isUndefined(name)){
	                    		name = parent.name+"::"+parsersHelper.getCount("get");
	                    	}

	                        return name;
	                    },
	                    /*parse: function(node,parent){

	                    },
	                    after: function(node,parent,cb){

	                    },*/
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

	                    	//var name = node.arguments[0].value;


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
	                    		url = parsersHelper.correctPathSync(url,parent);
	                    		parsersHelper.addNode({name:url},node,{reverse:true},function(){	           
						        	cb();	
								});	                    		
	                    	//});
	                    }
	                }];