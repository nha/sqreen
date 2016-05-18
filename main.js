var http = require('http'),
    sqreen = require('./sqreen');


function handleRequest(request, response) {
    response.end('Hello, world!');
}

var server = http.createServer(handleRequest);

server.listen(8888);
