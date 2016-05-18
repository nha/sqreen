var http = require('http'),
    sqreen = require('./index.js');


// sample http request
function handleRequest(request, response) {
    //response.setHeader("X-Instrumented-By", "Sqreen"); // we can't do that here though
    response.end('Hello, world!');
}

var server = http.createServer(handleRequest);
var PORT = 8888;

console.log('Starting server on port', PORT);
server.listen(PORT);
