var util = require('util');

var CacheStoreError = require('./CacheStoreError.js');

module.exports = NotFoundError;

/**
 * Error NotFoundError
 * */
function NotFoundError() {
    Error.call(this); //super constructor
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
}

util.inherits(NotFoundError, CacheStoreError);
