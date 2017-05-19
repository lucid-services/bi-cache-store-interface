
var CacheStoreError = require('./errors/CacheStoreError.js');
var NotFoundError   = require('./errors/NotFoundError.js');

module.exports                     = CacheStoreInterface;
module.exports.NotFoundError       = NotFoundError;
module.exports.CacheStoreError     = CacheStoreError;
module.exports.CacheStoreInterface = CacheStoreInterface;

/**
 * @constructor
 */
function CacheStoreInterface() {
    var constructorName = Object.getPrototypeOf(this).constructor.name;
    var interfaceMethods = Object.keys(CacheStoreInterface.prototype);

    interfaceMethods.forEach(function(method) {

        if (   this[method] === CacheStoreInterface.prototype[method]
            || ( typeof this[method] === 'function'
                && typeof CacheStoreInterface.prototype[method] === 'function'
                && this[method].length < CacheStoreInterface.prototype[method].length
            )
        ) {
            throw new Error(`${constructorName} must implement "${method}" method which matches "CacheStoreInterface.prototype.${method}" method signature`);
        }
    }, this);
}


/**
 * @public
 * @param {String} key
 *
 * @throws {CacheStoreError}
 * @throws {NotFoundError}
 * @return {Promise}
 */
CacheStoreInterface.prototype.fetch = function(key) {};

/**
 * @public
 * @param {String} key
 * @param {Function} callback
 *
 * @throws {CacheStoreError}
 * @throws {NotFoundError}
 * @return {undefined}
 */
CacheStoreInterface.prototype.get = function(/*key, cb*/) {};

/**
 * @public
 * @param {String}  key
 * @param {mixed}   data
 * @param {Integer} ttl - in seconds
 *
 * @throws {CacheStoreError}
 * @return {Promise}
 */
CacheStoreInterface.prototype.settle = function(key, data, ttl) {};

/**
 * @public
 * @param {String} key
 * @param {mixed}   data
 * @param {Integer} ttl - in seconds
 * @param {Function} callback
 *
 * @throws {CacheStoreError}
 * @throws {NotFoundError}
 * @return {undefined}
 */
CacheStoreInterface.prototype.set = function(/*key, data, ttl, cb*/) {};
