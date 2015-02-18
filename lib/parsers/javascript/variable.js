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
	                    rawType: "var"
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
	                }];