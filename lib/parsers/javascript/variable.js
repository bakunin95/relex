var parsersHelper = require("../parsersHelper");


module.exports = [{	    
						type: "ast",
						id: "Variable1", 
						active: true,
	                    query:{type:"VariableDeclarator",init:{type:"Identifier"}},
	                    group: "js-variable",
	                    name: function(node,parent){




	                        return parent.name+"::"+node.id.name;
	                    },
	                    rawName: ['id.name'],
	                    rawType: "variable"
	                },
	                {	
	                	type: "ast",
	                	id: "Variable2", 
	                	active: true,
	                    query:{type:"VariableDeclarator",init:{type:"Literal"}},
	                    group: "js-variable",
	                    name: function(node,parent){


	                        return parent.name+"::"+node.id.name;
	                    },
	                    rawName: ['id.name'],
	                    rawValue: function(node,parent){
	                    	if(typeof node.init.value === "object"){
	                    		return undefined;
	                    	}
	                    	else{
	                    		return node.init.value;
	                    	}
	                    },
	                    rawType: function(node,parent){
	                    	var type = (typeof node.init.value);
	                    	return type;
	                    }
	                },
	                 {	
	                 	type: "ast",
	                 	id: "Variable3", 
	                	active: true,
	                    query:{value:{type:"Literal"}},
	                    group: "js-variable",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.key.name;
	                    },
	                    rawName: ['key.name'],
	                    rawValue: function(node,parent){
	                    	if(typeof node.value.value === "object"){
	                    		return undefined;
	                    	}
	                    	else{
	                    		return node.value.value;
	                    	}
	                    },
	                    rawType: function(node,parent){
	                    	var type = (typeof node.value.value);
	                    	return type;
	                    }
	                },
	                 {	
	                 	type: "ast",
	                 	id: "Variable4", 
	                	active: true,
	                    query:{value:{type:"Identifier"}},
	                    group: "js-variable",
	                    name: function(node,parent){
	                    	
	                        return parent.name+"::"+node.key.name;
	                    },
	                    rawName: ['key.name'],
	                    rawValue: function(node,parent){
	                    	if(typeof node.value.name === "object"){
	                    		return undefined;
	                    	}
	                    	else{
	                    		return node.value.name;
	                    	}
	                    },
	                    rawType: function(node,parent){
	                    	var type = (typeof node.value.name);
	                    	return type;
	                    }
	                },
	                {	
	                 	type: "ast",
	                 	id: "Variable5", 
	                	active: true,
	                    query:{type:"AssignmentExpression",left:{object:{type:"ThisExpression"},property:{type:"Identifier"}},right:{type:"Literal"}},
	                    group: "js-variable",
	                    visibility: "+",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.left.property.name;
	                    },
	                    rawName: ['left.property.name'],
	                    rawValue: function(node,parent){
	                    
	                    		return node.right.value;
	                    },
	                    rawType: function(node,parent){
	                    	var type = (typeof node.right.value);
	                    	return type;
	                    }
	                },
	                {	
	                 	type: "ast",
	                 	id: "Variable6", 
	                	active: true,
	                    query:{type:"AssignmentExpression",left:{object:{type:"ThisExpression"},property:{type:"Identifier"}},right:{type:"Identifier"}},
	                    group: "js-variable",
	                    visibility: "+",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.left.property.name;
	                    },
	                    rawName: ['left.property.name'],
	                    rawValue: function(node,parent){
	                    
	                    		return node.right.value;
	                    },
	                    rawType: function(node,parent){
	                    	var type = "variable";
	                    	return type;
	                    }
	                },
	                {	
	                 	type: "ast",
	                 	id: "Variable7", 
	                	active: true,
	                	visibility: "+",
	                    query:{type:"AssignmentExpression",left:{object:{type:"ThisExpression"},property:{type:"Identifier"}},right:{type:"CallExpression"}},
	                    group: "js-variable",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.left.property.name;
	                    },
	                    rawName: ['left.property.name'],
	                    rawValue: function(node,parent){
	                    
	                    		return node.right.value;
	                    },
	                    rawType: function(node,parent){
	                    	var type = "expression";
	                    	return type;
	                    }
	                },
	                {
                        type: "ast",
                        id: "Variable8",
                        active: true,
                        query: {"type": "AssignmentExpression", "left": {"type": "MemberExpression", "object": { "type": "MemberExpression", property:{"name":"prototype"} }, "property": { "type": "Identifier" }},"right": {"type": "Literal"} },
                        group: "js-variable",
                        parse: function(node,parent){


                            var newNode = {};
                            newNode.data = JSON.stringify(node);
                            var LeftName = parsersHelper.getLeftName(node.left);
                            var protoVar = parsersHelper.getPrototypeVar(LeftName);
                            newNode.rawName = protoVar[1];
                            newNode.rawType = (typeof node.right.value);
                            newNode.rawValue = node.right.value;
                            newNode.name = parent.name+"::"+protoVar[0];

                            return newNode;
                        },
                        after: function(node,parent,cb){
                            var data = JSON.parse(node.data);
                            var LeftName = parsersHelper.getLeftName(data.left);
                            var protoVar = parsersHelper.getPrototypeVar(LeftName);
                            var rawValue = data.right.value;
                            var rawType = (typeof data.right.value);
                            parsersHelper.addNode({name:node.name+"::"+protoVar[1],rawName:protoVar[1],rawType:rawType,"rawValue":rawValue,group:"js-variable"},node,{},function(){           
                                cb();   
                            }); 
                        }

                    },
                    {
                        type: "ast",
                        id: "Variable8",
                        active: true,
                        query: {"type": "AssignmentExpression", "left": {"type": "MemberExpression", "object": { "type": "MemberExpression", property:{"name":"prototype"} }, "property": { "type": "Identifier" }},"right": {"type": "Identifier"} },
                        group: "js-variable",
                        parse: function(node,parent){


                            var newNode = {};
                            newNode.data = JSON.stringify(node);
                            var LeftName = parsersHelper.getLeftName(node.left);
                            var protoVar = parsersHelper.getPrototypeVar(LeftName);
                            newNode.rawName = protoVar[0];
                            newNode.name = parent.name+"::"+protoVar[0];

                            return newNode;
                        },
                        after: function(node,parent,cb){
                            var data = JSON.parse(node.data);
                            var LeftName = parsersHelper.getLeftName(data.left);
                            var protoVar = parsersHelper.getPrototypeVar(LeftName);
                            var rawValue = data.right.value;
                            parsersHelper.addNode({name:node.name+"::"+protoVar[1],rawName:protoVar[1],rawType:"variable","rawValue":rawValue,group:"js-variable"},node,{},function(){           
                                cb();   
                            }); 
                        }

                    }



	                ];