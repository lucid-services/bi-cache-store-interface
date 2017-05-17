var sinon          = require('sinon');
var chai           = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinonChai      = require("sinon-chai");
var Memcached      = require('memcached');

global.Promise     = require('bluebird');

var CacheStoreInterface = require('../../lib/index.js');
var MemcachedWrapper    = require('../../lib/stores/memcached.js');

//this makes sinon-as-promised available in sinon:
require('sinon-as-promised');

var expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('Memcached', function() {

    it('should not throw', function() {
        expect(function() {
            new MemcachedWrapper();
        }).to.not.throw(Error);
    });

    describe('get', function() {
        before(function() {
            this.memcached = new MemcachedWrapper();
        });

        beforeEach(function() {
            this.memcachedGetStub = sinon.stub(Memcached.prototype, 'get');
        });

        afterEach(function() {
            this.memcachedGetStub.restore();
        });

        it('should return fulfilled promise with data', function() {
            var data = {some: 'data'};

            this.memcachedGetStub.yields(null, data);
            return this.memcached.get('key').should.become(data);
        });

        it('should return rejected promise with `NotFoundError`', function() {

            this.memcachedGetStub.yields(null, null);
            return this.memcached.get('key').should.be.rejectedWith(MemcachedWrapper.NotFoundError);
        });

        it('should return rejected promise with an Error', function() {

            var err = new Error('rejection test');
            this.memcachedGetStub.yields(err, null);
            return this.memcached.get('key').should.be.rejectedWith(err);
        });
    });

    describe('set', function() {
        before(function() {
            this.memcached = new MemcachedWrapper();
        });

        beforeEach(function() {
            this.memcachedSetStub = sinon.stub(Memcached.prototype, 'set');
        });

        afterEach(function() {
            this.memcachedSetStub.restore();
        });

        it('should return fulfilled promise', function() {
            var self = this;
            var data = {
                some: 'data'
            };

            this.memcachedSetStub.yields(null);
            return this.memcached.set('key', data, 1).should.be.fulfilled.then(function() {
                self.memcachedSetStub.should.have.been.calledWith('key', data, 1);
            });
        });

        it('should return rejected promise with an Error', function() {

            var err = new Error('rejection test');
            this.memcachedSetStub.yields(err, null);
            return this.memcached.set('key', {some: 'data'}).should.be.rejectedWith(err);
        });
    });
});
