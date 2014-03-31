accept-language-parser
======================

Parses the accept-language header from an HTTP request and produces an array of language objects sorted by quality.

dependencies: none

usage:

```
var parser = require('accept-language-parser');

var language = parser.parse('en-GB,en;q=0.8');

console.log(language);
```

Output will be:

```
[
  {
    code: "en",
    region: "GB",
    quality: 1.0
  },
  {
    code: "en",
    region: undefined,
    quality: 0.8
  }
];
```

Output is always sorted in quality order from highest -> lowest. as per the http spec, omitting the quality value implies 1.0.

__Known issues__
- Cannot cope with multi-part region codes, i.e. 'az-AZ-Cyrl' will be treated as 'az-AZ'

__Running tests__
```
npm install
grunt test
```
