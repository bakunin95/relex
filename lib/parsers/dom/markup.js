var parsersHelper = require("../parsersHelper");
var      _ = require('underscore')._;


module.exports = [ {	active: true,
						id: "markup1",
						tag:['script'],
						parse: function(elem,parent){
							var node = {};

							if(!_.isUndefined(elem.attr("src"))){
								node.name = parsersHelper.correctPathSync(elem.attr("src"),parent);
							}
							else{
								node.data = elem.html();
								node.group = "js-markup";
								node.name = parent.name + "::" + parsersHelper.getCount("script");							
							}
							return node;
						}
					},
					{	active: true,
						id: "markup2",
						tag:['style'],
						group:"css-markup",
						parse: function(elem,parent){
							var node = {};
							node.data = elem.html();
							node.name = parent.name + "::" + parsersHelper.getCount("style");							
							return node;
						}
					},
					{	active: true,
						id: "markup3",
						tag:['link'],
						group:"css",
						name: function(elem,parent){
							if(!_.isUndefined(elem.attr("href"))){
								var name = parsersHelper.correctPathSync(elem.attr("href"),parent);
								return name;
							}
							else{
								return parent.name + "::" + parsersHelper.getCount("css");							
							}
						}
				 }];


				 