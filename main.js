var http = require('http'),
    sqreen = require('./sqreen');


function handleRequest(request, response) {
    //response.setHeader("X-Instrumented-By", "Sqreen"); // we can't do that here though
    response.end('Hello, world!');
}

var server = http.createServer(handleRequest);

server.listen(8888);
