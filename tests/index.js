var sinon          = require('sinon');
var chai           = require('chai');
var sinonChai      = require("sinon-chai");
var Promise        = require('bluebird');

var CacheStoreInterface = require('../lib/index.js');

var expect = chai.expect;

chai.use(sinonChai);
chai.should();

describe('CacheStoreInterface', function() {
    it('should throw when its instantiated dirrectly', function() {
        expect(function() {
            new CacheStoreInterface();
        }).to.throw(Error);
    });

    it('should throw when all required methods are NOT implemented', function() {
        function InterfaceImplementation() {
            CacheStoreInterface.call(this);
        };

        InterfaceImplementation.prototype = Object.create(CacheStoreInterface.prototype);
        InterfaceImplementation.prototype.constructor = InterfaceImplementation;

        InterfaceImplementation.prototype.fetch = function() {return Promise.resolve()};
        InterfaceImplementation.prototype.set = function(cb) {cb()};
        InterfaceImplementation.prototype.get = function(cb) {cb()};
        //required
        //InterfaceImplementation.prototype.settle = Promise.method(function() {});

        expect(function() {
            new InterfaceImplementation();
        }).to.throw(Error);
    });

    it('should throw when all required methods are NOT implemented (2)', function() {
        function InterfaceImplementation() {
            CacheStoreInterface.call(this);
        };

        InterfaceImplementation.prototype = Object.create(CacheStoreInterface.prototype);
        InterfaceImplementation.prototype.constructor = InterfaceImplementation;

        //required
        //InterfaceImplementation.prototype.fetch = Promise.method(function() {});
        InterfaceImplementation.prototype.settle = Promise.method(function() {});
        InterfaceImplementation.prototype.set = function(cb) {cb()};
        InterfaceImplementation.prototype.get = function(cb) {cb()};

        expect(function() {
            new InterfaceImplementation();
        }).to.throw(Error);
    });

    it('should not throw', function() {
        function InterfaceImplementation() {
            CacheStoreInterface.call(this);
        };

        InterfaceImplementation.prototype = Object.create(CacheStoreInterface.prototype);
        InterfaceImplementation.prototype.constructor = InterfaceImplementation;

        InterfaceImplementation.prototype.fetch = function(key) {return Promise.resolve()};
        InterfaceImplementation.prototype.settle = function(key,data,ttl) {return Promise.resolve()};
        InterfaceImplementation.prototype.set = function(cb) {cb()};
        InterfaceImplementation.prototype.get = function(cb) {cb()};

        expect(function() {
            new InterfaceImplementation();
        }).to.not.throw(Error);
    });
});
