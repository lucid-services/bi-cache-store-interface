var util = require('util');

module.exports = CacheStoreError;

/**
 * Error CacheStoreError
 * */
function CacheStoreError(message) {
    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
}

util.inherits(CacheStoreError, Error);
