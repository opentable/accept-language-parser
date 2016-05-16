var regex = /((([a-zA-Z]+(-[a-zA-Z]+)?)|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;

module.exports.parse = function(al){
    var strings = (al || "").match(regex);
    return strings.map(function(m){
        if(!m){
            return;
        }

        var bits = m.split(';');
        var ietf = bits[0].split('-');

        return {
            code: ietf[0],
            region: ietf[1],
            quality: bits[1] ? parseFloat(bits[1].split('=')[1]) : 1.0
        };
    }).filter(function(r){
            return r;
        }).sort(function(a, b){
            return b.quality - a.quality;
        });
};

module.exports.pick = function(supportedLanguages, acceptLanguage){
    if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage) {
        return null;
    }

    var accept = this.parse(acceptLanguage);

    var supported = supportedLanguages.map(function(support){
        var bits = support.split('-');

        return {
            code: bits[0],
            region: bits[1]
        };
    });

    for (var i = 0; i < accept.length; i++) {
        var lang = accept[i];
        for (var j = 0; j < supported.length; j++) {
            if (lang.code === supported[j].code && lang.region === supported[j].region) {
                return supportedLanguages[j];
            }
        }
    }

    return null;
};
