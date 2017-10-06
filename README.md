
```javascript
const CacheStoreInterface = require('bi-cache-store-interface');
const MemcachedStore      = require('bi-cache-store-interface/lib/stores/memcached');

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
