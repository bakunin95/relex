module.exports = [{	    type: "ast",
						id: "JsArray1",
						active: true,
	                    query:{type:"VariableDeclarator",init:{type:"ArrayExpression"}},
	                    group: "js-array",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.id.name;
	                    },
	                    rawName: ['id.name']
	                },
	                {	
	                	type: "ast",
	                	id: "JsArray2",
	                	active: true,
	                    query:{type:"VariableDeclarator",init:{type:"NewExpression",callee:{name:"Array"}}},
	                    group: "js-array",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.id.name;
	                    },
	                    rawName: ['id.name']
	                },
	                 {	
	                 	type: "ast",
	                	active: true,
	                	id: "JsArray3",
	                    query:{value:{type:"ArrayExpression"}},
	                    group: "js-array",
	                    name: function(node,parent){
	                        return parent.name+"::"+node.key.name;
	                    },
	                    rawName: ['key.name'],
	                    rawValue:['key.value']
	                }];