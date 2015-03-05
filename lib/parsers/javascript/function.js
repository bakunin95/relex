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
                        name: function(node,parent){
       

                            return parent.name+"::"+parsersHelper.getCount("func");+"::"+node.left.object.name+"."+node.left.property.name+"()";
                        },
                        rawName: function(node,parent){
                            return node.left.object.name+"."+node.left.property.name;
                        },
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
                        id: "jsFunction2",
                        active: false,
                        query: {"type": "AssignmentExpression", "left": {"type": "MemberExpression", "object": { "type": "MemberExpression", property:{"name":"prototype"} }, "property": { "type": "Identifier" }},"right": {"type": "FunctionExpression"} },
                        group: "js-function",
                        parse: function(node,parent){



                            var newNode = {};


                            newNode.data = JSON.stringify(node);

                            var LeftName = parsersHelper.getLeftName(node.left);

                            var LeftNameArr = LeftName.split(".");

                            var flag = 0;
                            var key = [];
                            var name = [];
                            _.each(LeftNameArr,function(token){
                                if(token === "prototype"){
                                    flag = 1;
                                }
                                else{
                                    if(flag === 0){
                                        key.push(token);
                                    }
                                    else{
                                        name.push(token);
                                    }
                                }
                            });


                            newNode.rawName = name.join(".");
                            newNode.rawType = key.join(".");


                            newNode.name = parent.name+"::"+key.join(".");
                            return newNode;
                        },
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

                        },
                        after: function(node,parent,cb){

                            var data = JSON.parse(node.data);

                            var LeftName = parsersHelper.getLeftName(data.left);

                            var LeftNameArr = LeftName.split(".");

                            var flag = 0;
                            var key = [];
                            var name = [];
                            _.each(LeftNameArr,function(token){
                                if(token === "prototype"){
                                    flag = 1;
                                }
                                else{
                                    if(flag === 0){
                                        key.push(token);
                                    }
                                    else{
                                        name.push(token);
                                    }
                                }
                            });



                            parsersHelper.addNode({name:node.name+"::"+name.join("."),group:"js-function"},node,{},function(){           
                                cb();   
                            }); 

                            //parsersHelper.correctParent(node,parent.name+"::"+node.rawType,cb);

                        }

                    },


                    {
                        type: "ast",
                        id: "jsFunction2",
                        active: true,
                        query: {"type": "AssignmentExpression", "left": {"type": "MemberExpression", "object": { "type": "ThisExpression" }, "property": { "type": "Identifier" }},"right": {"type": "FunctionExpression"} },
                        group: "js-function",
                        name: function(node,parent){

                            return parent.name+"::"+parsersHelper.getCount("func");+"::"+node.left.property.name+"()";
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
                        id: "jsFunction3",
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
                        id: "jsFunction4",
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


