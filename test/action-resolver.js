var chai = require("chai");
var expect = chai.expect;
var path = require("path");

var actionResolver = require('../action-resolver');

describe('actionResolver', function() {
  describe('#controllerssBasePath', function() {
    before(function() {
      actionResolver.controllersFolder = "test/controllers";
    })

    it("should return the base controller path", function() {
      expect(actionResolver.controllersBasePath()).to.be.equal(path.resolve(path.join(process.cwd(), 'test/controllers')));
    })
  });

  describe('#parseController', function () {
    it('should return a hash with parsed value', function() {
      var uri = "namespace/posts#create";
      var info = actionResolver.parseController(uri);

      expect(info.controllerPath).to.be.equal("namespace/posts");
      expect(info.controllerName).to.be.equal("posts");
      expect(info.action).to.be.equal("create");
    });
  });

  describe('#getHandler', function () {
    it("should get a handler from a controller file", function() {
      var uri = "posts#test";

      handler = actionResolver.getHandler(uri);

      expect(handler).to.be.a('function');
      expect(handler()).to.be.equal("Test");
    });

    it('should throw a error when a controller does not respot to an action', function () {
      var uri = "posts#fail";
      expect(function() { actionResolver.getHandler(uri) }).to.be.throw("Posts controller doesn't respond to #fail action");
    });
  });
})
