var http = require('http');


// fake array of pairs of rules
// [condition(req, res) - function(req, res)]

var serverRules = { "http" : [
    [(function (req, res) { return true; }),  (function (req, res) { res.setHeader("X-Instrumented-By", "Sqreen");})]
]};

function applyRules(rules, req, res) {
    for (var i = 0; i < rules.length; i++) {
        var rule = rules[i],
            cond = rule[0],
            fn   = rule[1];

        if(cond(req, res)) {
            fn(req, res); // potential side-effect
        }
    }
}

var _createServer = http.createServer; // original

// monkey-patch http.create calls
http.createServer = function (onRequest) {
    return _createServer.call(http, function (req, res) {
        applyRules(serverRules.http, req, res);
        return onRequest(req, res);
    });
};
