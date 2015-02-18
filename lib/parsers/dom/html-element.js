var parsersHelper = require("../parsersHelper");
var      _ = require('underscore')._;


module.exports = [ {	active: true,
						id: "html-element1",
						tag:['img','iframe','frame','video','audio'],
						group: "html-element",
						name: function(elem,parent){
							var tag = elem[0].tagName;

							if(!_.isUndefined(elem.attr("src"))){
								return parsersHelper.correctPathSync(elem.attr("src"),parent);
							}
							else{
								return parent.name + "::" + parsersHelper.getCount(tag);
							}

						},
						rawName: ['name','id','class']
					},
					{
						active: true,
						id: "html-element2",
						tag:['svg','canvas'],
						group: "html-element",
						name: ['name','id'],
						rawName: ['name','id']
					},
					{
						active: true,
						id: "html-element3",
						tag:['applet'],
						group: "html-element",
						name: ['code','name'],
						rawName: ['code','name']
					}];


