var app = require('./server');
var async = require('async');
var chai = require('chai')
var request = require('supertest');

var Router  = require('../router');
var router = new Router(app);


describe('namespace', function () {
  it('should namespace a route', function (done) {

    router.namespace('admin', function() {
      this.match("/posts", "posts#index")
    });

    request(app).get('/admin/posts').expect(200, done);
  });

  describe("nested", function() {
    it("should namespace a nested namespace", function(done) {

      router.namespace('admin', function() {
        this.namespace("dashboard", function() {
          this.match("/posts", "posts#index");
        })
      });

      request(app).get('/admin/dashboard/posts').expect(200, done);
    })
  })
});
