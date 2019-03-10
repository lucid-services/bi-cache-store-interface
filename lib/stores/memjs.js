var MemJS = require('memjs');

var CacheStoreInterface = require('../index.js').CacheStoreInterface;

module.exports = MemcachedWrapper;
module.exports.MemJS = MemcachedWrapper;

/**
 * @param {Array<String>|String} hosts
 * @param {Object} [options]
 * @constructor
 */
function MemcachedWrapper(hosts, options) {

    if (typeof hosts === 'string') {
        hosts = hosts.split(',');
    } else if (!Array.isArray(hosts)) {
        throw new Error(`Invalid "hosts" argument, expected: array or string but got: ${typeof hosts}`);
    }

    var servers = hosts.map(function(uri) {
      var uriParts = uri.split('@');
      var hostPort = uriParts[uriParts.length - 1].split(':');
      var userPass = (uriParts[uriParts.length - 2] || '').split(':');
      return new MemJS.Server(
          hostPort[0],
          parseInt(hostPort[1] || 11211, 10),
          userPass[0],
          userPass[1],
          options
      );
    });

    MemJS.Client.call(this, servers, options);
    CacheStoreInterface.call(this);
}

Object.assign(MemcachedWrapper, MemJS.Client);

MemcachedWrapper.prototype = Object.assign(
    Object.create(CacheStoreInterface.prototype),
    MemJS.Client.prototype
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
    return MemJS.Client.prototype.get.call(this, key).then(function(data) {
        if (!data) {
            return reject(new CacheStoreInterface.NotFoundError(key))
        }
        return data;
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
    try {
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }

        if (typeof ttl === 'number' && ttl > 60*60*24*30) {
            //if expires is greater than 30 days (60 x 60 x 24 x 30),
            //it is treated as a UNIX time (number of seconds since January 1, 1970).
            ttl = (Date.now() / 1000) + ttl;
        }

        return MemJS.Client.prototype.set.call(this, key, data, {expires: ttl});
    } catch(e) {
        return Promise.reject(e);
    }
};

/**
 * @public
 * @param {String}  key
 * @param {mixed}   data
 * @param {Integer} ttl - in seconds
 * @param {Function} cb - callback
 *
 * @throws {Error} - async
 * @return {undefined}
 */
MemcachedWrapper.prototype.set = function(key, data, ttl, cb) {
    try {
        if (typeof data === 'object') {
            data = JSON.stringify(data);
        }

        if (typeof ttl === 'number' && ttl > 60*60*24*30) {
            //if expires is greater than 30 days (60 x 60 x 24 x 30),
            //it is treated as a UNIX time (number of seconds since January 1, 1970).
            ttl = (Date.now() / 1000) + ttl;
        }

        return MemJS.Client.prototype.set.call(this, key, data, {expires: ttl}, cb);
    } catch(e) {
        return cb(e);
    }
};
