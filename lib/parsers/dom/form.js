var parsersHelper = require("../parsersHelper");

module.exports = [{		active: true,
						id: "form",
						tag:['form'],
						group: "form",
						name: ['name','id'],
						name: function(elem,parent){
							var elemName = parsersHelper.findFirstExistingAttr(elem,['name','id']);
							if(elemName == ""){
								elemName = parsersHelper.getCount("form");
							}



							return parent.name + "::" + elemName;
						},
						rawName: ['name','id']
					},
					{	active: true,
						id: "form-element",
						tag:['input','button','select','textarea','fieldset','legend','optgroup','option','datalist','keygen','output'],
						group: "form-element",
						name: function(elem,parent){
							var tag = elem[0].tagName;



							var elemName = parsersHelper.findFirstExistingAttr(elem,['name','id']);

							if(elemName == ""){
								elemName = parsersHelper.getCount(tag);
							}

							return parent.name + "::" + elemName;
						},
						rawName: ['name','id'],
						rawType: function(elem,parent){
							var tag = elem[0].tagName;
							return tag;
						}
					}];