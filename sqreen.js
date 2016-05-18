var http = require('http');


var _createServer = http.createServer; // original

// monkey-patch http.create calls
http.createServer = function (onRequest) {
    return _createServer.call(http, function (req, res) {
        res.setHeader("X-Instrumented-By", "Sqreen"); // we can do it here'
        return onRequest(req, res);
    });
};
