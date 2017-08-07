var sinon          = require('sinon');
var chai           = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinonChai      = require("sinon-chai");
var Memcached      = require('memcached');

global.Promise     = require('bluebird');

var MemcachedWrapper = require('../../../lib/stores/memcached.js');

//this makes sinon-as-promised available in sinon:
require('sinon-as-promised');

var expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('Memcached', function() {

    it('should return rejected Promise when a connection can not be established', function() {
        MemcachedWrapper.config.poolSize   = 1;
        MemcachedWrapper.config.retries    = 0;
        MemcachedWrapper.config.factor     = 1;

        var memcached = new MemcachedWrapper(["127.0.0.1:5555"], {
            failuresTimeout: 1000,//2s
            reconnect: 500, //1s
            timeout: 1000, //3s
            retries: 1,
            failures: 1,
            retry: 500,
            idle: 2000 //4s
        });

        return memcached.settle('some-very-random-key', 'value', 0).should.be.rejectedWith(Error);
    });
});
