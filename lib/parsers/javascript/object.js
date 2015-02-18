var parsersHelper = require("../parsersHelper");

module.exports = [{	    type: "ast",
						id: "Object1",
						active: true,
	                    query:{type:"VariableDeclarator",init:{type:"ObjectExpression"}},
	                    group: "js-object",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.id.name;
	                    },
	                    rawName: ['id.name']
	                },
	                {	
	                	type: "ast",
	                	id: "Object2",
	                	active: true,
	                    query:{type:"VariableDeclarator",init:{type:"NewExpression",callee:{name:"Object"}}},
	                    group: "js-object",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.id.name;
	                    },
	                    rawName: ['id.name']
	                },
	                {	
	                	type: "ast",
	                	id: "Object3",
	                	active: true,
	                    query:{type:"ExpressionStatement",expression:{type:"AssignmentExpression",left:{type:"MemberExpression"},right:{type:"ObjectExpression"}}},
	                    group: "js-object",
	                    name: function(node,parent){
	                    	var first = parsersHelper.getFirstDefinedArray(node,["expression.left.object.name"]);	 	
							var second = parsersHelper.getFirstDefinedArray(node,["expression.left.property.name"]);
	                        return parent.name+"::"+first+"."+second;
	                    },
	                    rawName: function(node,parent){
	                    	var first = parsersHelper.getFirstDefinedArray(node,["expression.left.object.name"]);	 	
							var second = parsersHelper.getFirstDefinedArray(node,["expression.left.property.name"]);
										
	                    	return first+"."+second;
	                    }
	                },
	                {	
	                	type: "ast",
	                	id: "Object4",
	                	active: true,
	                    query:{value:{type:"ObjectExpression"}},
	                    group: "js-object",
	                    name: function(node,parent){
	                    	var name = parsersHelper.getFirstDefinedArray(node,["key.name"]);	 	
	                        
	                    	if(name === ""){
	                    		name="undefined";
	                    	}
	                        return parent.name+"::"+name;
	                    },
	                    rawName: ["key.name"]
	                },
	                {	
	                	type: "ast",
	                	id: "Object5",
	                	active: false,
	                    query:{type:"ObjectExpression"},
	                    group: "js-object",
	                    name: function(node,parent){
	                    	var name = parsersHelper.getFirstDefinedArray(node,["key.name"]);	 	
	                        
	                    	if(name === ""){
	                    		name="undefined";
	                    	}
	                        return parent.name+"::"+name;
	                    },
	                    rawName: ["key.name"]
	                }];