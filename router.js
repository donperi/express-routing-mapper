var actionResolver = require('./action-resolver');
var _ = require('lodash');
var Namespace = require('./namespace');

var RESOURCES_ACTIONS = ['index', 'show', 'new', 'create', 'edit', 'update', 'destroy'];
var ALLOWED_METHODS = ['get', 'post', 'delete', 'put', 'patch'];


function Router(app) {
  this.__proto__.app = app;
}

Router.prototype.match = function(route, to, options) {

  if(typeof options != "object")
    options = {};

  if(typeof to === "object") {
    options = to;
  } else {
    options.to = to;
  }

  defaultsOptions = {
    via: "get",
    to: null,
    controller: null,
    action: null,
    namespace: null
  }

  options = _.extend({}, defaultsOptions, options);

  if(options.to !== null) {
    var _controllerArray = options.to.split("#");
    var _controller = _controllerArray[0];
    var _action     = _controllerArray[1];
  }

  if(typeof(options.controller) == "string") {
    _controller = options.controller
  }

  if(typeof(options.action) == "string") {
    _action = options.action
  }

  _to = _controller + "#" + _action

  if(ALLOWED_METHODS.indexOf(options.via) > -1) {
    var handler = actionResolver.getHandler(_to)
    this.app[options.via](route, handler);
  }
}

Router.prototype.get = function(route, to, options) {
  this.match(route, to, _.extend(options, {via: 'get'}));
};

Router.prototype.post = function(route, to, options) {
  this.match(route, to, _.extend(options, {via: 'post'}));
};

Router.prototype.put = function(route, to, options) {
  this.match(route, to, _.extend(options, {via: 'put'}));
};

Router.prototype.delete = function(route, to, options) {
  this.match(route, to, _.extend(options, {via: 'delete'}));
};

Router.prototype.namespace = function(name, callback) {
  new Namespace(this, name, callback);
};

Router.prototype.path = new String();

// Router.prototype.resources = function(name, callback) {
//   Resource(this, name, options, callback);
// };

// Router.prototype.resource = function(name, callback) {
//   Resource(this, name, options, callback);
// };


module.exports = Router;


