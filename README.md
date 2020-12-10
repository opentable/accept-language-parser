# accept-language-parser

[![CircleCI](https://circleci.com/gh/wealthsimple/accept-language-parser.svg?style=svg)](https://circleci.com/gh/wealthsimple/accept-language-parser)

Parses the accept-language header from an HTTP request and produces an array of language objects sorted by quality.

### Installation:

```bash
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

Output is always sorted in quality order from highest -> lowest. As per the HTTP spec, omitting the quality value implies 1.0.

#### parser.pick(supportedLangugagesArray, acceptLanguageHeader, options = {})

_Alias_: parser.pick(supportedLanguagesArray, parsedAcceptLanguageHeader)

```javascript
var parser = require("accept-language-parser");

var language = parser.pick(
  ["fr-CA", "fr-FR", "fr"],
  "en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8"
);

console.log(language);
```

Output will be:

```javascript
"fr-CA";

```

The `options` currently supports only the `loose` option which allows partial matching on supported languages.

For example:

```javascript
parser.pick(["fr", "en"], "en-GB,en-US;q=0.9,fr-CA;q=0.7,en;q=0.8", {
  loose: true,
});
```

Would return:

```javascript
"fr";

```

In loose mode the order of `supportedLanguagesArray` matters, as it is the first partially matching language that is returned. It means that if you want to pick more specific langauges first, you should list it first as well.

For example:

```javascript
["fr-CA", "fr"];
```

### Running test

```bash
npm install
npm test
```

### License

MIT
