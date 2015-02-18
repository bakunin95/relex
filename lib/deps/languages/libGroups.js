var _ = require('underscore')._;

var libGroups = module.exports = {
	groups: [	
			{keyword:"html",				label:"Html",						color:"#FF0000",text:"HTML",	count:0, foci:"center"},
			{keyword:"html-element", 		label:"Html elements",				color:"#00CCFF",text:"H-ELE",	count:0, foci:"center"},
			{keyword:"form", 				label:"Form",						color:"#880000",text:"FORM",	count:0, foci:"topLeft"},
			{keyword:"form-element", 		label:"Form elements",				color:"#996600",text:"F-ELE",	count:0, foci:"topLeft"},
			{keyword:"js",					label:"JavaScripts",				color:"#0000FF",text:"JS",		count:0, foci:"bottomLeft"},
			{keyword:"js-markup",			label:"JavaScripts Markup",			color:"#D9D9FF",text:"JS",		count:0, foci:"bottomLeft"},
			{keyword:"js-unreachable",		label:"Unreachable JavaScripts",	color:"#6699FF",text:"JS",		count:0, foci:"bottomLeft"},		
			{keyword:"js-object",			label:"JavaScripts objects",		color:"#B041FF",text:"JS-OBJ",	count:0, foci:"bottomLeft"},
			{keyword:"js-array",			label:"JavaScripts arrays",			color:"#800080",text:"JS-ARR",	count:0, foci:"bottomLeft"},
			{keyword:"js-function",			label:"JavaScripts functions",		color:"#C45AEC",text:"JS-FUNC",	count:0, foci:"bottomLeft"},
			{keyword:"js-method",			label:"JavaScripts methods",		color:"#E6A9EC",text:"JS-MET",	count:0, foci:"bottomLeft"},
			{keyword:"js-variable",			label:"JavaScripts variable",		color:"#C38EC7",text:"JS-VAR",	count:0, foci:"bottomLeft"},
<<<<<<< HEAD
			{keyword:"js-method-call",		label:"JavaScripts call",			color:"#CC99FF",text:"JS-CALL",	count:0, foci:"bottomLeft"},
=======
			{keyword:"js-call",				label:"JavaScripts call",			color:"#CC99FF",text:"JS-CALL",	count:0, foci:"bottomLeft"},
>>>>>>> 1b6cd69c802ab730b60e42bde85f3d585a6c92f1
			{keyword:"backbone-element",	label:"Backbone elements",			color:"#E6C4FF",text:"BBONE",	count:0, foci:"bottomLeft"},
			{keyword:"angular-js-element",	label:"Angular javascript elements",color:"#AECFC6",text:"ANG",		count:0, foci:"bottomLeft"},
			{keyword:"angular-html-element",label:"Angular html elements",		color:"#AECFC6",text:"ANG",		count:0, foci:"bottomLeft"},
			{keyword:"css",					label:"Css",						color:"#009900",text:"CSS",		count:0, foci:"topRight"},
			{keyword:"css-rule",			label:"Css rules",					color:"#006600",text:"CSS",		count:0, foci:"topRight"},
			{keyword:"css-markup",			label:"Css Markups",				color:"#00AA00",text:"CSS",		count:0, foci:"topRight"},
			{keyword:"css-unreachable",		label:"Unreachable Css",			color:"#00BB00",text:"CSS",		count:0, foci:"topRight"},
			{keyword:"link",				label:"External Links",				color:"#6699FF",text:"LINK",	count:0, foci:"centerRight"},
			{keyword:"anchor",				label:"Anchor(#)",					color:"#D462FF",text:"#",		count:0, foci:"centerRight"},
			{keyword:"email",				label:"Email",						color:"#009933",text:"@",		count:0, foci:"centerRight"},
			{keyword:"ajax",				label:"AJAX Requests",				color:"#0000FF",text:"AJAX",	count:0, foci:"centerLeft"},
			{keyword:"ws",					label:"Web Services",				color:"#CC3366",text:"WS",		count:0, foci:"bottomCenter"},
			{keyword:"php",					label:"PHP",						color:"#F2BFFF",text:"PHP",		count:0, foci:"bottomRight"},
			{keyword:"java-package",		label:"JAVA packages",				color:"#FFAA00",text:"JPCK",	count:0, foci:"bottomRight"},
			{keyword:"java-class",			label:"JAVA classes",				color:"#FFCC00",text:"JAVA",	count:0, foci:"bottomRight"},
			{keyword:"java-field",			label:"JAVA fields",				color:"#F87217",text:"FIELD",	count:0, foci:"bottomRight"},
			{keyword:"java-method",			label:"JAVA methods",				color:"#C85A17",text:"METH",	count:0, foci:"bottomRight"},
			{keyword:"jsp",					label:"JAVA server page",			color:"#C48CDB",text:"JSP",		count:0, foci:"bottomRight"},
			{keyword:"tpl",					label:"Templates",					color:"#0000FF",text:"TPL",		count:0, foci:"topLeft"},
			{keyword:"unknown",				label:"Unknown",					color:"#CCEBF5",text:"?",		count:0, foci:"center"}
		  ]
};