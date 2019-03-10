[![Build Status](https://travis-ci.org/lucid-services/serviser-cache-store-interface.svg?branch=master)](https://travis-ci.org/lucid-services/serviser-cache-store-interface)  

```javascript
const CacheStoreInterface = require('serviser-cache-store-interface');
const MemcachedStore      = require('serviser-cache-store-interface/lib/stores/memcached');

const memcached = new MemcachedStore(["127.0.0.1:11211"], {
    timeout: 5000,
    idle: 30000,
    retries: 1,
    failures: 5,
    retry: 30000,
    failuresTimeout: 300000,
    remove: false,
    reconnect: 120000
});

memcached instanceof CacheStoreInterface //true
```
