var regex = /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;

var isString = function(s){
    return typeof(s) === 'string';
};

function parse(al, mapLocale){
    var strings = (al || "").match(regex);
    var mapLocale = mapLocale || function (x) { return x; }

    return strings.map(function(m){
        if(!m){
            return;
        }

        var bits = m.split(';');
        var ietf = mapLocale(bits[0]);
        ietf = ietf.split('-');
        var hasScript = ietf.length === 3;

        return {
            code: ietf[0],
            script: hasScript ? ietf[1] : null,
            region: hasScript ? ietf[2] : ietf[1],
            quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0
        };
    }).filter(function(r){
            return r;
        }).sort(function(a, b){
            return b.quality - a.quality;
        });
}

// zh-CN = Simplified script with Mandarin grammar = Chinese as written in China
// zh-TW = Traditional script with Mandarin grammar = Chinese as written in Taiwan
// zh-HK = Traditional script with Cantonese grammar = Chinese as written in Hong Kong

var newLocales = {
    // https://docs.microsoft.com/en-us/previous-versions/dotnet/netframework-4.0/dd997383(v=vs.100)
    'zh-cht': 'zh-Hant',
    'zh-chs': 'zh-Hans',

    'zh-tw': 'zh-Hant-TW',
    'zh-hk': 'zh-Hant-HK',
    'zh-mo': 'zh-Hant-MO',

    // https://gist.github.com/amake/0ac7724681ac1c178c6f95a5b09f03ce
    'zh-sg': 'zh-Hans-SG',
    'zh-cn': 'zh-Hans-CN'
};

function mapLocalesDefault(oldLocale) {
    // some apps use  "_" instead of "-".
    var newLocale = oldLocale.toLowerCase().replace(/_/g, '-');
    newLocale = newLocales[newLocale] || newLocale;
    // console.log(oldLocale, newLocale);
    return newLocale;
}

function pick(supportedLanguages, acceptLanguage, options){
    options = options || {};

    if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) {
        return null;
    }

    if(isString(acceptLanguage)){
        acceptLanguage = parse(acceptLanguage, options.mapLocales || mapLocalesDefault);
    }

    var supported = supportedLanguages.map(function(support){
        var bits = support.split('-');
        var hasScript = bits.length === 3;

        return {
            code: bits[0],
            script: hasScript ? bits[1] : null,
            region: hasScript ? bits[2] : bits[1]
        };
    });

    for (var i = 0; i < acceptLanguage.length; i++) {
        var lang = acceptLanguage[i];
        var langCode = lang.code.toLowerCase();
        var langRegion = lang.region ? lang.region.toLowerCase() : lang.region;
        var langScript = lang.script ? lang.script.toLowerCase() : lang.script;
        for (var j = 0; j < supported.length; j++) {
            var supportedCode = supported[j].code.toLowerCase();
            var supportedScript = supported[j].script ? supported[j].script.toLowerCase() : supported[j].script;
            var supportedRegion = supported[j].region ? supported[j].region.toLowerCase() : supported[j].region;
            if (langCode === supportedCode &&
              (options.loose || !langScript || langScript === supportedScript) &&
              (options.loose  || !langRegion || langRegion === supportedRegion)) {
                return supportedLanguages[j];
            }
        }
    }

    return null;
}

module.exports.parse = parse;
module.exports.pick = pick;
