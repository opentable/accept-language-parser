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