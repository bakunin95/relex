##RELEX Relation extractor for web applications (Node.js)

Extract metrics and relations from the source code of a web application.
Return a report in a file or JSON object.
The report contain a list of the files with metrics extracted by escomplex, jslint, csslint and a list of relations between the files. 

## Installation

    $ npm install relex -g


##Usage (CLI): 
```
relex path/to/website path/to/result/file.json

relex path/to/website path/to/result/file.json --includenodemodules
```

##Usage within node.js

relex.extract("path/to/webApp",includenodemodules ...

```
var relex = require("relex");

relex.extract("path/to/webApp",false,function(err,report){
	
});

```
##Parameter

--includenodemodules : include node_modules folder, this parameter will add relations of "node_modules" files into the analysis.

##Example:

![Example](/example/result/example.png?raw=true "Example")

run example/example.cmd in node console or node example.js

##EXAMPLE RESULT FOR A JS FILE
```
{
            "name": "website_example/js/s1.js",
            "group": 2,
            "exist": true,
            "infoFile": {
                "file": "s1.js",
                "folder": "website_example/js",
                "parentFolder": "website_example"
            },
            "id": 6,
            "_id": "Xrnjc4bOMg94dkQs",
            "composition": {
                "variables": [
                    "foo"
                ],
                "functions": [],
                "objects": []
            },
        }
```

##FILES (HTML/JS/CSS):

|Type | Elements
|------|----------
|id | id of the file
|name | name of the file
|group |  group of the file
|exist | if hosted on the server (true) else (false)


##COMPOSITION (JS)
|Type | Elements
|------|----------
|variables | variables contained in the javaScript
|functions |  functions contained in the javaScript
|objects |  object contained in the javaScript


##INFOFILE (ALL)
|Type | Elements
|------|----------
|file | name of the file
|folder |  folder of the file
|parentFolder |  folder of the parent


##LINKS
|Type | Elements
|------|----------
|source | id of the source file
|target | id of the target file


##Contributions

RELEX is in early development and all contributions are welcomed.
For more info on the project contact me at jugle66@hotmail.com


## License

The MIT License (MIT)
Copyright (c) 2014 Bakunin95
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
