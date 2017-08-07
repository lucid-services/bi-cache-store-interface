var Memcached = require('memcached');

var CacheStoreInterface = require('../index.js').CacheStoreInterface;

module.exports = MemcachedWrapper;
module.exports.Memcached = MemcachedWrapper;

/**
 * @param {String|Array|Object} hosts
 * @param {Object} [options]
 * @constructor
 */
function MemcachedWrapper(hosts, options) {

    if (   typeof hosts !== 'string'
        && !Array.isArray(hosts)
        && typeof hosts !== 'object'
        || hosts === null
    ) {
        throw new Error(`Invalid "hosts" argument, expected: string|array|object but got: ${typeof hosts}`);
    }

    Memcached.apply(this, arguments);
    CacheStoreInterface.call(this);
}


MemcachedWrapper.prototype = Object.assign(
    Object.create(CacheStoreInterface.prototype),
    Memcached.prototype
);
MemcachedWrapper.prototype.constructor = MemcachedWrapper;


/**
 * @return {Promise}
 */
MemcachedWrapper.prototype.inspectIntegrity = function() {
    return this.settle(`integrity_check_process_${process.pid}`, process.pid, 10)
    .then(function() {
        return true;
    });
};


/**
 * @public
 * @param {String} key
 *
 * @throws {Error} - async
 * @throws {NotFoundError} - async
 * @return {Promise}
 */
MemcachedWrapper.prototype.fetch = function(key) {
    var self = this;

    return new Promise(function(resolve, reject) {
        Memcached.prototype.get.call(self, key, function(err, data) {
            if (err) {
                return reject(err);
            }

            if (!data) {
                return reject(new CacheStoreInterface.NotFoundError(key))
            }

            return resolve(data);
        });
    });
};

/**
 * @public
 * @param {String}  key
 * @param {mixed}   data
 * @param {Integer} ttl - in seconds
 *
 * @throws {Error} - async
 * @return {Promise}
 */
MemcachedWrapper.prototype.settle = function(key, data, ttl) {
    var self = this;

    return new Promise(function(resolve, reject) {
        Memcached.prototype.set.call(self, key, data, ttl, function(err) {
            if (err) {
                return reject(err);
            }

            return resolve();
        });
    });
};
