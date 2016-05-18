var request = require('supertest'),
    express = require('express'),
    sqreen  = require('../../index.js');


var app = express();

app.get('/', function (req, res) {
    res.send('Hello, World!');
});

describe('GET /', function() {
    it('injects a header', function(done) {
        request(app)
            .get('')
            .expect('X-Instrumented-By', /Sqreen/)
            .expect(200, done);
    });
});
