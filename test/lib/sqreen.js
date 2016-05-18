var request = require('supertest'),
    express = require('express'),
    chai    = require('chai'),
    spies   = require('chai-spies'),
    rewire  = require('rewire'),
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
