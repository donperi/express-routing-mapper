var util   = require('util');
var Router = require('./router');
var _      = require('lodash');

function Namespace(parent, name, callback) {
  this.parent = parent;
  this.name   = name;
  this.__proto__ = parent.__proto__;
  this.__proto__.parent = parent;

  this.match = function(route, to, options) {
    this.parent.match(this.pathName() + route, to, options)
  }

  this.pathName = function() {
    return "/" + this.name;
  }

  this.namespace = function(name, callback) {
    namespace = Namespace(this, name, callback);
  }

  this.path = function() {
    return this.parent.path + this.pathName();
  }

  callback.call(this);
}

module.exports = Namespace;
