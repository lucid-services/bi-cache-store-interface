var sinon          = require('sinon');
var chai           = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinonChai      = require("sinon-chai");
var MemJS          = require('memjs');

global.Promise = require('bluebird');

var CacheStoreInterface = require('../../../lib/index.js');
var MemcachedWrapper    = require('../../../lib/stores/memjs.js');

//this makes sinon-as-promised available in sinon:
require('sinon-as-promised');

var expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.should();

describe('MemJS', function() {

    it('should not throw', function() {
        expect(function() {
            new MemcachedWrapper('127.0.0.1:11211');
        }).to.not.throw(Error);
    });

    it('should be instanceof CacheStoreInterface', function() {
        expect(new MemcachedWrapper('127.0.0.1:11211')).to.be.instanceof(CacheStoreInterface);
    });

    describe('fetch', function() {
        before(function() {
            this.memjs = new MemcachedWrapper('127.0.0.1:11211');
        });

        beforeEach(function() {
            this.memjsGetStub = sinon.stub(MemJS.Client.prototype, 'get');
        });

        afterEach(function() {
            this.memjsGetStub.restore();
        });

        it('should return fulfilled promise with data', function() {
            var data = {some: 'data'};

            this.memjsGetStub.resolves(data);
            return this.memjs.fetch('key').should.become(data);
        });

        it('should return rejected promise with `NotFoundError`', function() {

            this.memjsGetStub.resolves(null);
            return this.memjs.fetch('key').should.be.rejectedWith(MemcachedWrapper.NotFoundError);
        });

        it('should return rejected promise with an Error', function() {

            var err = new Error('rejection test');
            this.memjsGetStub.rejects(err);
            return this.memjs.fetch('key').should.be.rejectedWith(err);
        });
    });

    describe('settle', function() {
        before(function() {
            this.memjs = new MemcachedWrapper('127.0.0.1:11211');
        });

        beforeEach(function() {
            this.memjsSetStub = sinon.stub(MemJS.Client.prototype, 'set');
        });

        afterEach(function() {
            this.memjsSetStub.restore();
        });

        it('should return fulfilled promise', function() {
            var self = this;
            var data = {
                some: 'data'
            };

            this.memjsSetStub.resolves(null);
            return this.memjs.settle('key', data, 1).should.be.fulfilled.then(function() {
                self.memjsSetStub.should.have.been.calledWith('key', JSON.stringify(data), {expires: 1});
            });
        });

        it('should return rejected promise with an Error', function() {

            var err = new Error('rejection test');
            this.memjsSetStub.rejects(err);
            return this.memjs.settle('key', {some: 'data'}, 0).should.be.rejectedWith(err);
        });
    });

    describe('set', function() {
        before(function() {
            this.memjs = new MemcachedWrapper('127.0.0.1:11211');
        });

        it('should should not be equal to the equivalent CacheStoreInterface stub function', function() {
            this.memjs.set.toString().should.not.be.equal(CacheStoreInterface.prototype.set.toString());
        });
    });

    describe('get', function() {
        before(function() {
            this.memjs = new MemcachedWrapper('127.0.0.1:11211');
        });

        it('should should not be equal to the equivalent CacheStoreInterface stub function', function() {
            this.memjs.get.toString().should.not.be.equal(CacheStoreInterface.prototype.get.toString());
        });
    });

});
