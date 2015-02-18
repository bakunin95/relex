var _ = require('underscore')._;
var parsersHelper = require("../parsersHelper");


module.exports = [ {	active: true,
						id: "aLink",
						tag:['a'],
						parse: function(elem,parent){
							var node = {};
							if(!_.isUndefined(elem.attr("href"))){


								if(elem.attr("href").substring(0, 1)==="#"){
									node.name = parent.name + "::" +elem.attr("href");
									node.group = "anchor";
								}
								else{
									node.name = parsersHelper.correctPathSync(elem.attr("href"),parent);
								}
							}
							else{
								node.name = parent.name + "::" + parsersHelper.getCount("a");							
								node.group = "link";
							}

							return node;
						},
						altname: "a",
						rawName: ['href']
					}];