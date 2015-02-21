var cheerio = require("cheerio");
var async = require("async");
var fs = require("fs");
var _ = require("lodash");
var db = require("../database.js");

var requireDir = require('require-dir');
var parsersList = requireDir("../../parsers/dom/");
var parsersHelper = require("../../parsers/parsersHelper");

var Log = require("log");
//var log = new Log('info',fs.createWriteStream('domClass.log'));
var log = {info:function(){}}

var domClass = module.exports = {
	analyze: function(files,cbDomClass){
		
		domClass.parsers = _.where(_.flatten(_.map(parsersList, function(n) { return n; })),{"active": true});
		domClass.tags = _.flatten(_.pluck(domClass.parsers,"tag"));
		async.eachSeries(files,function(parent,cbFiles){

			fs.readFile(parent.name,"utf-8", function read(err, data) {
				var $ = cheerio.load(data);	
				async.each($.root(),function(elem,cbHTML){
					domClass.recursiveElement($,elem,parent,cbHTML);
				},function(err){
					//console.log("done",parent.name);
					cbFiles();
				});
			});
			
		},function(){
			cbDomClass();
		});

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
	generateNode: function(elem,parser,parent){

		var node = {};




		if(typeof parser.name === "function"){
			node.name = parser.name(elem,parent);
		}
		else if(typeof parser.name === "object") {
			node.name = domClass.findFirstExistingAttr(elem,parser.name);
		}

		if(node.name == "" && parser.altname){
			node.name = parsersHelper.getCount(parser.altname);

		}

		if(typeof parser.rawName === "function"){
			node.rawName = parser.rawName(elem,parent);
		}
		else if(typeof parser.rawName === "object") {
			node.rawName = domClass.findFirstExistingAttr(elem,parser.rawName);
		}

		if(typeof parser.rawValue === "function"){
			node.rawValue = parser.rawValue(elem,parent);
		}
		else if(typeof parser.rawValue === "object") {
			node.rawValue = domClass.findFirstExistingAttr(elem,parser.rawValue);
		}

		if(typeof parser.group === "function"){
			node.group = parser.group(elem,parent);
		}
		else if(typeof parser.group === "string") {
			node.group = parser.group;
		}

		if(typeof parser.parse === "function"){
			_.assign(node, parser.parse(elem,parent));
		}

		log.info("GenerateNode: from Parser "+parser.id+ " Node: "+node.name);


		return node;
	},
	recursiveElement: function($,elem,parent,cbRE){
		var tag = $(elem).get(0).tagName;
		if(_.contains(domClass.tags,tag)){
			var parser = _.find(domClass.parsers, function(parser){
				return _.contains(parser.tag,tag)
			});

			var node = domClass.generateNode($(elem),parser,parent);
			
			db.addAssetAsync(node,parent,{},function(err,newParent){
				if($(elem).children().length>0){
					async.each($(elem).children(),function(elem,cbRE2){
						domClass.recursiveElement($,elem,newParent,cbRE2);
					},function(){
						cbRE();
					});
				}
				else{
					cbRE();
				}
			});
		}
		else{
			if($(elem).children().length>0){
				async.each($(elem).children(),function(elem,cbRE2){
					domClass.recursiveElement($,elem,parent,cbRE2);
				},function(){
					cbRE();
				});
			}
			else{
				cbRE();
			}
		}
	}
}