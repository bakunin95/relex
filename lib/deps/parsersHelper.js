var requireDir = require('require-dir'),
			_ = require('underscore')._,
	    async = require("async"),
	    cheerio = require('cheerio'),
	    libGroups = require("./languages/libGroups"),
      esprima = require('esprima'),
      path = require('path'),
      estraverse = require('estraverse'),
      esquery = require('esquery');


var db = require("./database.js");

var parsersHelper = module.exports = {
	scriptCount: 1,
  formCount: 1,
  counter: {},
  groups: libGroups.groups,
    loadRelationsClass: function(relationsClass){
    	parsersHelper.relationsClass = relationsClass;
    },
   	jQuery: function(data){
   		if(_.isUndefined(data)){
   			data = "";
   		}
   		return cheerio.load(data);	
   	},
    getCount: function(counterName){
      if(_.isUndefined(parsersHelper.counter[counterName])){
        parsersHelper.counter[counterName] = 1;
      }
      else{
        parsersHelper.counter[counterName]++;
      }
      return parsersHelper.counter[counterName];
    },
    getFirstDefined: function(list){
      var Defined = _.find(list,function(name){ return !_.isUndefined(name); } );

      if(_.isUndefined(Defined)){
        return "";
      }
      else{
        return Defined;
      } 
    },
    safeVariableContent: function(rawValue){
      switch(typeof rawValue){
        case "string":
          rawValue = rawValue.replace(/\W/g, ' ');
          if(rawValue.length>30){
            
            rawValue = rawValue.substr(0,30);
          }
        break;
        case "boolean":
        break;
        case "number":
        rawValue = rawValue.toString();
          if(rawValue.length>30){
            
            rawValue = rawValue.substr(0,30);
          }
        default:
        rawValue = (typeof rawValue);
        break;
      }
      return rawValue;
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
    parseJsObject: function(query,data){
      var ajaxResult = "";
      var esprimaQuery = "";

      if(data){ 
         try{
          var ast = esprima.parse(data);
          if(query.split(".").length == 3){
            query = query.split(".");
            esprimaQuery = '[callee.object.object.name="'+query[0]+'"][callee.object.property.name="'+query[1]+'"][callee.property.name="'+query[2]+'"]';
          }
          else if(query.split(".").length == 2){
            query = query.split(".");
            esprimaQuery = '[callee.object.name="'+query[0]+'"][callee.property.name="'+query[1]+'"]';

          }
          else{
            esprimaQuery = '[callee.object.name="'+query+'"]';
          }
          var selectorAst = esquery.parse(esprimaQuery);     
          ajaxResult = esquery.match(ast, selectorAst);
         }catch(err){
            parsersHelper.errorHandler(err);

            //console.log("cant parse","data");
         }
      }
      return ajaxResult;
    },

    filterAST: function(AST,filter,cbFilterAST){
      _.each(filter.split("."),function(currentFilter){
            var ajaxResult = _.pluck(AST, currentFilter);
      });
      cbFilterAST(null,ajaxResult);
    },

    esprimaQuery: function(data,query,asyncMap,callb){
      var ajaxResult = "";
      if(data){ 
         try{
          var ast = esprima.parse(data);
          var selectorAst = esquery.parse(query,{tolerance:true});     
          ajaxResult = esquery.match(ast, selectorAst);
          async.map(ajaxResult, asyncMap, function(){
            setImmediate(callb());
          });

         }catch(e){
         //   console.log("cant parse file, js contain error",e);
            //console.log(data);
            setImmediate(callb());
         }
      }else{
        setImmediate(callb());
      }
    },
    esprimaASTQuery: function(ast,query,asyncMap,callb){
      var ajaxResult = "";
      if(ast){ 
         try{
          var selectorAst = esquery.parse(query);     
          ajaxResult = esquery.match(ast, selectorAst);
          async.map(ajaxResult, asyncMap, function(){
            callb();
          });

         }catch(e){
            console.log("esprimaSAST error:",e);
            callb();
         }
      }else{
        callb();
      }
    },

    getJsObjectArgs: function(jsObject,cbObjArgs){
     
      if(!_.isUndefined(jsObject) && jsObject.arguments !== null  && jsObject.arguments[0].properties !== null && !_.isUndefined(jsObject.arguments) && !_.isUndefined(jsObject.arguments[0])){
        
        async.map(jsObject.arguments[0].properties, function(argument,cbVar){ 
          var value = (argument.value !== null && argument.value.type == 'Literal') ? argument.value.value : "";
          if(argument.value.type == 'FunctionExpression' && argument.value.body.type == 'BlockStatement'){
            value = "function()";
          }
          cbVar(null,{key:argument.key.name,value:value});                           
        },function(err,result){
          cbObjArgs(result);
        });
      }
      else{
        cbObjArgs([]);
      }
    },
    getLinkList: function(filter,cbForEachLink){
    	db.findLinks(filter,function(links){
    		cbForEachLink(null,links);
    	});
    },
    getNodeList: function(filter,cbForEachnode){
    	db.nodes.find(filter,function(err,nodes){
    		cbForEachNode(null,nodes);
    	});
    },
    getNode: function(filter,cbForEachnode){
    	db.nodes.findOne(filter,function(err,nodes){
    		cbForEachNode(null,nodes);
    	});
    },
    updateLink: function(link,cbUpdateLink){
      db.linkUpdate(target,function (err){
        parsersHelper.errorHandler(err);
        cbUpdateLink();
      });
    },
    addNode: function(node,parent,link,cbAddNode){
  			db.addAssetAsync(parent,node,link,function(err,nodeAdded){					
  				cbAddNode(err,nodeAdded); 	
  			}); 
    },
    correctPath: function(filePath,parent,type,cbCorrectPath){
      process.nextTick(function() {
      if(type == "js2js"){
          if(filePath.substring(0, 2) == "./"){
            filePath = filePath.substring(2);
          }

          var mixedPath = path.normalize(parent.infoFile.folder +"/"+ filePath); 
          mixedPath = mixedPath.replace(/\\/g,"\/" ).replace("//", "/");  

          db.findOneNode({"name":mixedPath},function(foundNode2){
            if(!_.isUndefined(foundNode2)){
              cbCorrectPath(null,mixedPath);
            }
            else{
              cbCorrectPath(null,filePath);
            } 
          });
      }
      else{
        setImmediate(cbCorrectPath(null,filePath));
      }
    });

    },
    errorHandler: function(err){
		if(err){
			err.file =  "parsersHelper.js";
			err.func = func;
			console.log("Error",err);
		}
	}
};