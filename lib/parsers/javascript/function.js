//var db = require("../../deps/database.js");
//var Def = require("../../models/def.js");

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
                                return rawValue.join();
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
                                return rawValue.join();
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
                        id: "jsFunction3",
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
                                return rawValue.join();
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


