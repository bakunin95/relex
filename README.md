##RELEX Relations extractor for web applications (Node.js)

Extract metrics and relations from the source code of a web application.
Return a report in a JSON object or file.
The report contain a list of the files with metrics extracted by escomplex, jslint, csslint and a list of relations between the files. 

## Installation

    $ npm install relex -g


##Usage (CLI): 
```
relex path/to/website path/to/result/file.json
```

##Usage within node.js

```
var relex = require("relex");

relex.extract("path/to/webApp",function(err,report){
	
});

```

##Example:

![Example](/example/result/example.png?raw=true "Example")

run example/example.cmd in node console or node example.js


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

##COMPLEXITY EXAMPLE
```
"complexity": {
                "aggregate": {
                    "sloc": {
                        "logical": 5,
                        "physical": 11
                    },
                    "cyclomatic": 1,
                    "halstead": {
                        "operators": {
                            "distinct": 3,
                            "total": 5
                        },
                        "operands": {
                            "distinct": 6,
                            "total": 6
                        },
                        "length": 11,
                        "vocabulary": 9,
                        "difficulty": 1.5,
                        "volume": 34.86917501586544,
                        "effort": 52.303762523798156,
                        "bugs": 0.011623058338621813,
                        "time": 0.0008071568290709592
                    },
                    "params": 0,
                    "line": 1,
                    "cyclomaticDensity": 20
                },
                "functions": 2,
                "dependencies": [],
                "maintainability": 171,
                "params": 0
            }
```

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
