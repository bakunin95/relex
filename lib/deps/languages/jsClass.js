var fs = require("fs");
var esprima = require("esprima");
var estraverse = require("estraverse");
var async = require("async");
var ecjson=require('ecjson');
var db = require("../database.js");

var _ = require("lodash");
_.mixin(require("lodash-deep"));
var requireDir = require('require-dir');
var parsersList = requireDir("../../parsers/javascript/");

var Log = require("log");
//var log = new Log('info',fs.createWriteStream('jsclass.log'));
var log = {info:function(){}}

var jsClass = module.exports = {
	node: [],
	nodeId: 0,
	after: [],
	analyze: function(files,cbjsClass){

		jsClass.parsers = _.where(_.flatten(_.map(parsersList, function(n) { return n; })),{"active": true});

		//jsClass.parsersNormal = _.sortBy(_.where(_.flatten(_.map(parsersList, function(n) { return n; })),{"active": true, type:"normal"}, 'priority'));
		
		jsClass.queries = _.pluck(jsClass.parsers,"query");

		async.eachSeries(files,function(parent,cbFiles){
			var data = "";
			async.waterfall([
			    function(callback){
			    	if(parent.group == "js-markup"){
						data = parent.data;
						callback(null, data);
					}
					else{
						fs.readFile(parent.name,'utf8',function(err,data){
							callback(null, data);
						})
					}		        
			    },
			    function(data, callback){
			       /*async.eachSeries(jsClass.parsersNormal,function(parser,cbNormParse){
						parser.parse(parent,data,cbNormParse);
				   },function(err2){*/
						try{
							var ast = esprima.parse(data);
							jsClass.readAST(ast,parent,function(err,elements){
								jsClass.recursiveNode(elements,parent,function(){
							        cbFiles();
							    });
								
							});
						}catch(e){
							console.log("can't parse "+parent.name+":",e);
							cbFiles();
						}
					//});
				}	
			]);
		},function(){
			cbjsClass();
		});

	},
	getFirstDefinedArray: function(AST,list){
      var Defined = "";
      var candidate = null;

      _.each(list,function(filter){
            var currentFilter = filter.split(".");
            if(!_.isUndefined(AST[currentFilter[0]])){
              candidate = AST[currentFilter[0]];
            }
            else{
              return false;
            }
            var n = 1;
            if(currentFilter.length > 1){
              while (n !== currentFilter.length) {
                if(!_.isUndefined(candidate[currentFilter[n]])){
                  candidate = candidate[currentFilter[n]];
                }
                else{
                  break;
                }
                n++;
              }
            }
            if(n == currentFilter.length){
              Defined = candidate;
            } 
       });
      return Defined;
    },
	generateNode: function(node,parent,parser){

		var newNode = {};

		newNode.nodeId = jsClass.nodeId;
		newNode.rootParent = parent.name;
		newNode.rootParentId = parent.id;

		if(typeof parser.name === "function"){
			newNode.name = parser.name(node,parent);
		}
		else if(typeof parser.name === "object") {
			newNode.name = jsClass.getFirstDefinedArray(node,parser.name);
		}	

		newNode.rawName = jsClass.autoGenField("rawName",node,parent,parser);
		newNode.rawValue = jsClass.autoGenField("rawValue",node,parent,parser);
		newNode.rawType = jsClass.autoGenField("rawType",node,parent,parser);
		newNode.visibility = jsClass.autoGenField("visibility",node,parent,parser);

		newNode.group = jsClass.autoGenField("group",node,parent,parser);

		if(typeof parser.parse === "function"){
			_.assign(newNode, parser.parse(node,parent));
		}

		log.info("GenerateNode: from Parser "+parser.id+ " Node: "+newNode.name);

		jsClass.nodeId++;

		return newNode;
	},
	autoGenField: function(field,node,parent,parser){
		if(typeof parser[field] === "function"){
			return parser[field](node,parent);
		}
		else if(typeof parser[field] === "object") {
			return jsClass.getFirstDefinedArray(node,parser[field]);
		}
		else{
			return parser[field];
		}
	},
	readAST: function(ast,parent,cb){

		var code = [];
		var res = estraverse.replace(ast, {
		    enter: function (node,parentNode) {

		    	//console.log(jsClass.queries);

		        var queryNum = 0;
		        _.each(jsClass.queries,function(query){
		            if(_.isMatch(node,query)){
         				try{
         					/*console.log("#############");
			            	console.log(query);
			            	console.log(jsClass.parsers[queryNum]);
			            	console.log("#############");*/
			            	

				            	var parser = _.findWhere(jsClass.parsers, {query: query});
				            	/*console.log("#########");
			        			console.log("@@@",query);
			        			console.log("***",parser);
			        			console.log("#########");*/

			        			var genNode = jsClass.generateNode(node,parent,parser);
	         					jsClass.node.push(genNode);
				            	//var rowId = jsClass.node.push()) - 1;


				            	jsClass.after[genNode.nodeId] = parser.after;
				                code.push("<node id='"+genNode.nodeId+"'>");
				                node.match = true;
			            	
		            	}
		            	catch(e){
		            		console.log("@@ JSClass error@@"+parent.name+" "+node.name,e+" while parsing:"+jsClass.parsers[queryNum].id);
		            	}
		                return;
		            }
		            queryNum++;
		        });
		       return node;

		    },
		    leave: function (node,parent) {
		        if(node.match == true){
		            code.push("</node>");
		        }
		    }
		});

		 
		if(code.length>0){

			jsClass.Classednode = _.indexBy(jsClass.node, 'nodeId');
			jsClass.node = [];

			ecjson.XmlToJson(code.join(""), function (nodeslist) {
			    cb(null,nodeslist);
			});
		}
		else{
			cb(null,null);
		}

	},

	recursiveNode: function(root,parent,cbRecursive){
		if(root == null){
			cbRecursive();
			return;
		}
	    if(_.isUndefined(root.node.length)){
	        root.node = [root.node];
	    }
	    async.eachSeries(root.node,function(currentNode,cb){

	        var node = jsClass.Classednode[currentNode.id];

	        log.info("Adding: "+node.name+"=>"+parent.name);

	        if(node.addAsset === false){

	        }
	        else{
		        db.addAssetAsync(node,parent,{},function(err,newParent){



		        	async.series([
					    function(cbAfter){
					    	if(!_.isUndefined(jsClass.after[currentNode.id])){
						    	jsClass.after[currentNode.id](newParent,parent,cbAfter);
					    	}
					    	else{
					    		cbAfter();
					    	}
					    },
					    function(cbRec){ 
					    	if(!_.isUndefined(currentNode.node)){
					            jsClass.recursiveNode(currentNode,newParent,cb);
					        }
					        else{
					            cb();
					        }
					        cbRec();

					    }
					]);


		        
			    });
		    }
	    },function(err){
	        cbRecursive();
	    });
	}
}



