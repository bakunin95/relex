var fs = require("graceful-fs"),
    path = require("path"),
    url = require("url"),
	scan = require("./utilities/scan"),
    async = require("async"),
    domClass = require("./languages/domClass.js"),
    jsClass = require("./languages/jsClass.js"),
    miscClass = require("./languages/miscClass.js"),
    parsersLib = require("./parsersLib.js"),
    libGroups = require("./languages/libGroups.js"),
    dependencyClass = require("./languages/dependencyClass.js"),

    _ = require('underscore')._;


    var db = require("./database.js");


var relationsClass = module.exports = {
    nodes: new Array(),
    links: new Array(),
    processed: false,
    website_folder: null,
    "sourceCount":0,
    "targetCount":0,
    "internalCount":0,
    "groups": libGroups.groups,
    assignGroupForExisting: function(filePath){
		var extension = relationsClass.getExtension(filePath);
		var group = "unknown";


		if ((filePath.substring(0, 7) == "http://") || (filePath.substring(0, 8) == "https://")){
			group = "link";
		} 
		else if (filePath.substring(0, 1) == "#"){
			group = "anchor";
		}
		else if (filePath.substring(0, 7) == "mailto:"){
			group = "email";
		}
		else{
			switch(extension){
				case "php":
					group = "php";
				break;
				case "html":
				case "htm":
				case "":
				case "/":
					group = "html";
				break;
				case "js":
					group = "js";
				break;
				case "css":
					group = "css";
				break;
				case "class":
					group = "java-class";
				break;
				case "jsp":
					group = "jsp";
				break;
			}
		}		
		return group;
	},
	assignGroupForNonExisting: function(filePath){

		var extension = relationsClass.getExtension(filePath);
		var group = "unknown";

		if(filePath == null || typeof filePath !== "string" || filePath == true || _.isUndefined(filePath)){
			return group;
		}

		if (filePath.substring(0, 1) == "#"){
			group = "anchor";
		}
		else if (filePath.substring(0, 7) == "mailto:"){
			group = "email";
		}
		else{
			switch(extension){
				case "php":
					group = "php";
				break;
				case "html":
				case "htm":
				case "":
				case "/":
					group = "html";
				break;
				case "js":
						if ((filePath.substring(0, 7) == "http://") || (filePath.substring(0, 8) == "https://")){
							group = "ws";
						}
						else{
							group = "js-unreachable";
						}
				break;
				case "css":
					if ((filePath.substring(0, 7) == "http://") || (filePath.substring(0, 8) == "https://")){
							group = "ws";
						}
						else{
							group = "css-unreachable";
						}
				break;

			}
		}		
		return group;
	},
    getRelations: function(website_folder,include_node_modules,callbackMain){
	    	async.waterfall([
	    		function(cbFirst){
	    			db.startServer(function(){
	    				// Connection au serveur local
	    				cbFirst();
	    			});
	    		},
			    function(callbackListFiles){
			    	// Get existing file list
			    	scan(website_folder, ['js','css','html','php','erb','htm','tpl','jade','ejs','hbs','class','jsp'],include_node_modules, function(err, fileList) {	
			    	    relationsClass.errorHandler(err);	
						callbackListFiles(err,fileList);
			    	});   
			    },
			    function(fileList,callbackCreateNodes){
			    	// Create nodes from existing files
			    	async.each(fileList, function(filePath,cbEtape1){	
			    	var group = relationsClass.assignGroupForExisting(filePath);	
			    		if(group !== "java-class"){

			    			//fs.readFile(filePath,"utf-8", function read(err, data) {
								db.addNodesAsync({"name":filePath,"group":group, "exist":true},cbEtape1);    											    		
			    			//});

			    		}
			    		else{
			    			db.addNodesAsync({"name":filePath,"group":group, "exist":true},cbEtape1);  
			    		}
			    		
			    	},function(err){
			    		relationsClass.errorHandler(err);
			    		fileList = null;
			    		callbackCreateNodes(err);
			    	});	    

			    },
			    function(cbDomClass){

			    	db.findNodes({group:"html"},function(nodesList){
			    		domClass.analyze(nodesList,function(){
			    			console.log("finished HTML analysis...");
			    			cbDomClass();
			    		});
			    	});

			    	
			    },
			    function(cbJsClass){



			    	
//or : [{	group : 'js'}, {group : 'js-markup'	}]


			    	db.findNodes({group:{inq:["js","js-markup"]}},function(nodesList){
			    		jsClass.analyze(nodesList,function(){
			    			console.log("finished js analysis...");
			    			cbJsClass();
			    		});
			    	});
			    },
			     function(cbMiscClass){
			    	db.findNodesById({},function(nodesList){
			    		miscClass.analyze(nodesList,function(){
			    			console.log("finished misc analysis...");
			    			cbMiscClass();
			    		});
			    	});
			    },
			    function(cbDepClass){
			    	dependencyClass.analyze(function(){
			    		cbDepClass();
			    	});
			    }
			], function (err) {
				// Run plugins


				console.log("update element ids...");

		    //	parsersLib.processList(function(err){


		    		db.fixIdentities(function(){
		    			callbackMain(err);
		    		});

		   // 	});	

			});
	},
	getExtension: function(correctedPath){
		var filename = "";
		try{
			filename = url.parse(correctedPath).pathname.split(".").pop().toLowerCase();
		}catch(e){}
		return filename;
	},
	errorHandler: function(err){
		if(err){
			err.file =  "relationsClass.js";
			//err.func = func;
			console.log("Error",err);
		}
	}
};