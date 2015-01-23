var path = require('path');
var _s = require("underscore.string");
module.exports = {

  controllersFolder: "controllers",

  controllersBasePath: function() {
    return path.resolve(path.join(process.cwd(), this.controllersFolder));
  },

  parseController: function(uri) {
    var object = {};
    var controllerArray = uri.split('#');

    object.controllerPath = controllerArray[0];

    var controllerPathArray = object.controllerPath.split('/');

    object.controllerName = controllerPathArray[controllerPathArray.length - 1];
    object.action = controllerArray[1];

    return object;
  },

  getHandler: function(uri) {
    var info = this.parseController(uri);
    var module = require(path.join(this.controllersBasePath(), info.controllerPath));
    if(module.hasOwnProperty(info.action)) {
      return module[info.action];
    } else {

      throw _s.capitalize(info.controllerName) + " controller doesn't respond to #" + info.action + " action";

    }
  }

}
