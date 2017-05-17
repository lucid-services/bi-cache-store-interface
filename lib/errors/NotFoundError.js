var util = require('util');

var CacheStoreError = require('./CacheStoreError.js');

module.exports = NotFoundError;

/**
 * Error NotFoundError
 *
 * @param {String} key
 *
 * */
function NotFoundError(key) {

    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.key = key;
    this.message = `${key} not found.`;
}

util.inherits(NotFoundError, CacheStoreError);
