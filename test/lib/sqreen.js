var supertest = require('supertest'),
    express = require('express'),
    chai    = require('chai'),
    expect  = require('chai').expect,
    spies   = require('chai-spies'),
    rewire  = require('rewire'),
    http    = require('http'),
    request = require('request'),
    sqreen  = require('../../index.js');


chai.use(spies);
var sqreenInternals = rewire("../../lib/sqreen.js");

describe('apply rules', function() {

    it('the function calls matching rules', function(done) {
        var fakeRules = [
            [(function (req, res) {return true; }), function code(req, res) {done();}]
        ];
        sqreenInternals.__get__('applyRules')(fakeRules, null, null);
    });

    it('the function does not call non-matching rules', function() {
        var fakeRules = [
            [(function (req, res) { return false; }),
             function (req, res) { throw new Error("I should not be called"); }]
        ];
        sqreenInternals.__get__('applyRules')(fakeRules, null, null);
    });

});


// simple http example

describe('http get /', function() {
    it('injects a header', function(done) {
        function handleRequest(req, res) {
            res.end('Hello, world!');
        }

        var server = http.createServer(handleRequest);

        server.listen(9999); // another port for tests

        request.get('http://localhost:9999', function (err, res, body){
            expect(res.statusCode).to.equal(200);
            expect(res.headers['x-instrumented-by']).to.equal('Sqreen'); // lowercase with request
            expect(res.body).to.equal('Hello, world!');
            done();
        });
    });
});


// same test with express, no need for port

var app = express();

app.get('/', function (req, res) {
    res.send('Hello, World!');
});

describe('GET /', function() {
    it('injects a header', function(done) {
        supertest(app)
            .get('')
            .expect('X-Instrumented-By', /Sqreen/)
            .expect(200, done);
    });
});
