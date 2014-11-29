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
            "report": [
                {
                    "id": "(error)",
                    "raw": "'{a}' was used before it was defined.",
                    "code": "used_before_a",
                    "line": 1,
                    "character": 11,
                    "a": "require",
                    "reason": "'require' was used before it was defined."
                }
            ],
            "reportCount": 1,
            "complexity": {
                "aggregate": {
                    "sloc": {
                        "logical": 1,
                        "physical": 1
                    },
                    "cyclomatic": 1,
                    "halstead": {
                        "operators": {
                            "distinct": 3,
                            "total": 3
                        },
                        "operands": {
                            "distinct": 3,
                            "total": 3
                        },
                        "length": 6,
                        "vocabulary": 6,
                        "difficulty": 1.5,
                        "volume": 15.509775004326936,
                        "effort": 23.264662506490403,
                        "bugs": 0.005169925001442312,
                        "time": 0.00035902256954460497
                    },
                    "params": 0,
                    "line": 1,
                    "cyclomaticDensity": 100
                },
                "functions": 0,
                "dependencies": [
                    {
                        "line": 1,
                        "path": "data/data.json",
                        "type": "CommonJS"
                    }
                ],
                "maintainability": 160.23748032084416,
                "params": 0
            },
            "complexityNormalyzed": {
                "sloc": {},
                "aggregate": {
                    "halstead": {
                        "operators": {
                            "distinct": 0.5,
                            "total": 0.25
                        },
                        "operands": {
                            "distinct": 0.25,
                            "total": 0.21428571428571427
                        },
                        "lngth": null,
                        "vocabulary": 0.3333333333333333,
                        "difficulty": 0.42857142857142855,
                        "volume": 0.14305528460401518,
                        "effort": 0.061309407687435064,
                        "bugs": 0.14305528460401518,
                        "time": 0.061309407687435064
                    },
                    "cyclomatic": 1,
                    "params": null,
                    "line": 1,
                    "cyclomaticDensity": 0
                },
                "maintainability": 0.9370612884259892,
                "functions": 0,
                "params": null,
                "reportCount": 0.05263157894736842
            }
        }
```

##FILES (HTML/JS/CSS):

|Type | Elements
|------|----------
|id | id of the file
|name | name of the file
|group |  group of the file
|exist | if hosted on the server (true) else (false)
|complexity | complexity metrics
|complexityNormalyzed | normalyzed complexity metrics

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

##REPORT (JS/CSS)
|Type | Elements
|------|----------
|id | ...
|raw |  ...
|code |  ...
|line |  ...
|character |  ...
|a |  ...
|reason |  ...

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
