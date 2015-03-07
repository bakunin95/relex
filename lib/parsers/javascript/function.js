//var db = require("../../deps/database.js");
//var Def = require("../../models/def.js");
var parsersHelper = require("../parsersHelper");

var _ = require('underscore')._;

module.exports = [ {	
                        type: "ast",
                        id: "jsFunction1",
                        active: true,
                        query:{type:"FunctionDeclaration"},
                        group: "js-function",
                        name: function(node,parent){
                            //console.log(node);

                            return parent.name+"::"+node.id.name+"()";
                        },
                        rawName: ['id.name'],
                        rawValue: function(node,parent){
                            var rawValue = [];
                            _.each(node.params,function(param){
                                if(param.type === "Identifier" && !_.isUndefined(param.name)){
                                    rawValue.push(param.name);
                                }
                            });
                            if(rawValue.length>0){
                                return rawValue.join(", ");
                            }
                            else{
                                return "";
                            }
                        },
                        after: function(node,parent,cb){





                            /*
                            var def = new Def({parentid:node.rootParentId,nodeid:node._id,func:node.rawName});
                            def.save(function (err) {
                               // if(err){console.log("#Err",err)};
                              cb();
                            });    */  
                            cb();
                        }
                    },
                    {
                        type: "ast",
                        id: "jsFunction2",
                        active: true,
                        query: {"type": "AssignmentExpression", "left": {"type": "MemberExpression", "object": { "type": "Identifier" }, "property": { "type": "Identifier" }},"right": {"type": "FunctionExpression"} },
                        group: "js-function",
                        parse: function(node,parent){
                            var newNode = {};
                            var LeftName = parsersHelper.getLeftName(node.left);
                            newNode.name = parent.name+"::"+LeftName;
                            newNode.rawName = LeftName;
                            newNode.rawValue = parsersHelper.getParams(node.right.params);
                            return newNode;
                        }
                    },
                    {
                        type: "ast",
                        id: "jsFunction3",
                        active: true,
                        query: {"type": "AssignmentExpression", "left": {"type": "MemberExpression", "object": { "type": "MemberExpression", property:{"name":"prototype"} }, "property": { "type": "Identifier" }},"right": {"type": "FunctionExpression"} },
                        group: "js-function",
                        parse: function(node,parent){
                            var newNode = {};
                            newNode.data = JSON.stringify(node);
                            var LeftName = parsersHelper.getLeftName(node.left);
                            var protoVar = parsersHelper.getPrototypeVar(LeftName);
                            newNode.rawValue = parsersHelper.getParams(node.right.params);
                            newNode.rawName = protoVar[0];
                            newNode.rawType = protoVar[0];
                            newNode.name = parent.name+"::"+protoVar[0];
                            return newNode;
                        },
                        after: function(node,parent,cb){
                            var data = JSON.parse(node.data);
                            var LeftName = parsersHelper.getLeftName(data.left);
                            var protoVar = parsersHelper.getPrototypeVar(LeftName);
                            var rawValue = parsersHelper.getParams(data.right.params);
                            parsersHelper.addNode({name:node.name+"::"+protoVar[1],rawName:protoVar[1],"rawValue":rawValue,group:"js-function"},node,{},function(){           
                                cb();   
                            }); 
                        }

                    },


                    {
                        type: "ast",
                        id: "jsFunction4",
                        active: true,
                        query: {"type": "AssignmentExpression", "left": {"type": "MemberExpression", "object": { "type": "ThisExpression" }, "property": { "type": "Identifier" }},"right": {"type": "FunctionExpression"} },
                        group: "js-function",
                        visibility: "+",
                        name: function(node,parent){

                            return parent.name+"::"+node.left.property.name+"()";
                        },
                        rawName: ['left.property.name'],
                        rawValue: function(node,parent){
                            var rawValue = [];


                            _.each(node.right.params,function(param){
                                if(param.type === "Identifier" && !_.isUndefined(param.name)){
                                    rawValue.push(param.name);
                                }
                            });
                           
                            if(rawValue.length>0){
                                return rawValue.join(", ");
                            }
                            else{
                                return "";
                            }

                        }

                    },
                    {   
                        type: "ast",
                        id: "jsFunction5",
                    	active: true,
                        query:{type:"VariableDeclarator",init:{type:"FunctionExpression"},id:{type:"Identifier"}},
                        group: "js-function",
                        name: function(node,parent){

                           // console.log(node);

                            return parent.name+"::"+node.id.name+"()";
                        },
                        rawName: ['id.name'],
                        rawValue: function(node,parent){
                            var rawValue = [];


                            _.each(node.init.params,function(param){
                                if(param.type === "Identifier" && !_.isUndefined(param.name)){
                                    rawValue.push(param.name);
                                }
                            });
                           
                            if(rawValue.length>0){
                                return rawValue.join(", ");
                            }
                            else{
                                return "";
                            }

                        },
                        after: function(node,parent,cb){

/*
                            var def = new Def({parentid:node.rootParentId,nodeid:node._id,func:node.rawName});
                            def.save(function (err) {
                               // if(err){console.log("#Err",err)};
                              cb();
                            });   */   
cb();
                        }
                    },
                     {
                        type: "ast",  
                        id: "jsFunction6",
                        active: true,
                        query:{value:{type:"FunctionExpression"},key:{type:"Identifier"}},
                        group: "js-function",
                        name: function(node,parent){
                            return parent.name+"::"+node.key.name+"()";
                        },
                        rawName: ['key.name'],
                        rawValue: function(node,parent){
                            var rawValue = [];


                            _.each(node.value.params,function(param){
                                if(param.type === "Identifier" && !_.isUndefined(param.name)){
                                    rawValue.push(param.name);
                                }
                            });
                           
                            if(rawValue.length>0){
                                return rawValue.join(", ");
                            }
                            else{
                                return "";
                            }

                        },
                        after: function(node,parent,cb){
                            

/*
                            var def = new Def({parentid:node.rootParentId,nodeid:node._id,func:node.rawName});
                            def.save(function (err) {
                               // if(err){console.log("#Err",err)};
                              cb();
                            });   */   
cb();
                        }
                    }];


