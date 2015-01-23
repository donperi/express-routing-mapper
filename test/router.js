var app = require('./server');
var async = require('async');
var chai = require('chai')
var request = require('supertest');

var Router  = require('../router');
var router = new Router(app);


describe('router', function () {
  describe('#match', function () {

    it('should map a action to an controller', function (done) {

      router.match('/posts', {
        to: 'posts#index'
      });

      router.match('/posts/create', 'posts#create', {
        via: 'post'
      });

      router.match('/posts/new', {
        via: 'get',
        controller: 'posts',
        action: 'new'
      });


      // TODO: Refactor this
      request(app).get('/posts').expect(200, function() {

        request(app).post('/posts/create').expect(201, function() {

          request(app).get('/posts/new').expect(200, done);

        });

      });

    });

  });

});
