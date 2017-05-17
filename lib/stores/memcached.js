var Memcached = require('memcached');

var CacheStoreInterface = require('../index.js').CacheStoreInterface;

module.exports = MemcachedWrapper;
module.exports.Memcached = MemcachedWrapper;

/**
 * @constructor
 */
function MemcachedWrapper() {
    Memcached.apply(this, arguments);
    CacheStoreInterface.call(this);
}


MemcachedWrapper.prototype = Object.assign(
    Object.create(CacheStoreInterface.prototype),
    Memcached.prototype
);


/**
 * @public
 * @param {String} key
 *
 * @throws {Error} - async
 * @throws {NotFoundError} - async
 * @return {Promise}
 */
MemcachedWrapper.prototype.get = function(key) {
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
MemcachedWrapper.prototype.set = function(key, data, ttl) {
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
