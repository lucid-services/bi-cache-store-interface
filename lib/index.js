
var CacheStoreError = require('./errors/CacheStoreError.js');
var NotFoundError   = require('./errors/NotFoundError.js');

module.exports                     = CacheStoreInterface;
module.exports.NotFoundError       = NotFoundError;
module.exports.CacheStoreError     = CacheStoreError;
module.exports.CacheStoreInterface = CacheStoreInterface;

/**
 * @constructor
 *
 * @param {Object} store
 */
function CacheStoreInterface(store) {
    var constructorName = Object.getPrototypeOf(this).constructor.name;

    if (!store || typeof store !== 'object') {
        throw new Error('`store` must be a store gateway object');
    }

    if (   this.get === CacheStoreInterface.prototype.get
        || this.get.length !== CacheStoreInterface.prototype.get.length
    ) {
        throw new Error(`${constructorName} must implement "get" method which matches "CacheStoreInterface.prototype.get" method signature`);
    } else if (   this.set === CacheStoreInterface.prototype.set
               || this.set.length !== CacheStoreInterface.prototype.set.length
    ) {
        throw new Error(`${constructorName} must implement "set" method which matches "CacheStoreInterface.prototype.set" method signature`);
    }

    this.store = store;
}


/**
 * @public
 * @param {String} key
 *
 * @throws {CacheStoreError}
 * @throws {NotFoundError}
 * @return {Promise}
 */
CacheStoreInterface.prototype.get = function(key) {};

/**
 * @public
 * @param {String}  key
 * @param {mixed}   data
 * @param {Integer} ttl - in seconds
 *
 * @throws {CacheStoreError}
 * @return {Promise}
 */
CacheStoreInterface.prototype.set = function(key, data, ttl) {};
