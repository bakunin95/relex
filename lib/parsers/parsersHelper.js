var      _ = require('underscore')._,
      path = require('path'),
        db = require('../deps/database');

var parsersHelper = module.exports = {
  counter:{},
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
  getCount: function(counterName){
      if(_.isUndefined(parsersHelper.counter[counterName])){
        parsersHelper.counter[counterName] = 1;
      }
      else{
        parsersHelper.counter[counterName]++;
      }
      return counterName+">"+parsersHelper.counter[counterName];
  },
  findFirstExistingAttr: function(elem,attrs){
    var name = "";
    _.each(attrs,function(attr){
        if(!_.isUndefined(elem.attr(attr))){
          name = elem.attr(attr);
          return;
        }
    });
    return name;
  },
  correctPathSync: function(filePath,parent){
      if(_.isUndefined(filePath) || _.isUndefined(parent.folder) || (filePath.substring(0, 7) == "http://") || (filePath.substring(0, 7) == "http://")){
        return filePath;    
      } 
      else{
        var mixedPath = path.normalize(parent.folder +"/"+ filePath);
        mixedPath = mixedPath.replace(/\\/g,"\/" ).replace("//", "/"); 
        return mixedPath; 
      }
  },
  correctPath: function(filePath,parent,cbCorrectPath){
      process.nextTick(function() {



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
    });
    },
    addNode: function(node,parent,link,cbAddNode){
     // db.correctPath(node.name,parent,function(err,correctPath){
      var correctPath = node.name;
      //parsersHelper.correctPath(node.name,node,function(err,correctPath){
        if(node.group === "js" && correctPath.substr(correctPath.length - 3) !== ".js"){
            correctPath = correctPath+".js";
          }
          node.name = correctPath;

          db.addAssetAsync(node,parent,link,function(err,nodeAdded){   
                  
            cbAddNode(err,nodeAdded);   
          }); 
      //});   

     // }); 


        
    }
};