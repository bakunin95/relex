var    _ = require('underscore')._;

//var db = require("../../deps/database.js");
//var Call = require("../../models/call.js");



module.exports = [ {	
                        type: "ast",
                        id: "JsCall",
                        active: false,
                       query:{type:"CallExpression",callee:{type:"MemberExpression",object:{type:"Identifier"},property:{type:"Identifier"}}},
                     //   query:{type:"CallExpression"},

                        group: "js-method-call",
                        parse: function(node,parent){
                            var newNode = {};
                        	
                        	var object = node.callee.object.name;
							var call = node.callee.property.name;

							newNode.name = object+"."+call+"()";


                            //console.log(object+"."+call);
                            newNode.group = "js-method-call";
                            newNode.rawName = object;
                            newNode.rawValue = call;


                            return newNode;
                        },
                        after: function(node,parent,cb){
                            /*

                            var call = new Call({parentid:node.rootParentId,nodeid:node._id,obj:node.rawName,func:node.rawValue});

                            call.save(function (err) {
                              cb();
                            });

*/
cb();
                            

                        }
                    }];