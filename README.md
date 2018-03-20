accept-language-parser
======================

[![Build Status](https://travis-ci.org/opentable/accept-language-parser.png?branch=master)](https://travis-ci.org/opentable/accept-language-parser) [![NPM version](https://badge.fury.io/js/accept-language-parser.png)](http://badge.fury.io/js/accept-language-parser) ![Dependencies](https://david-dm.org/opentable/accept-language-parser.png)

Parses the accept-language header from an HTTP request and produces an array of language objects sorted by quality.


### Installation:

```
npm install accept-language-parser
```

### API

#### parser.parse(acceptLanguageHeader)

```
var parser = require('accept-language-parser');

var languages = parser.parse('en-GB,en;q=0.8');

console.log(languages);
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

#### parser.pick(supportedLangugagesArray, acceptLanguageHeader, options = {})

*Alias*: parser.pick(supportedLanguagesArray, parsedAcceptLanguageHeader)

```
var parser = require('accept-language-parser');

var language = parser.pick(['fr-CA', 'fr-FR', 'fr'], 'en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8');

console.log(language);
```

Output will be:

```
"fr-CA"
```

The `options` currently supports only `loose` option that allows partial matching on supported languages. For example:


```
parser.pick(['fr', 'en'], 'en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8');
```

Would return:

```
"fr"
```

In loose mode the order of `supportedLanguagesArray` matters, as it is the first partially matching language that is returned. It means that if you want to pick more specific langauge first, you should list it first as well, for example: `['fr-CA', 'fr']`.

### Running test
```
npm install
npm test
```

### License
MIT
