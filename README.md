# storage interfaces

## memcache
Usage example (taken from /index.js):
```js
//requires etc.
const Storage          = require('bi-cache-store-interface/lib/stores/memcached');
/**
* Storage({String | Array[String] hosts, Object memcached options (see: https://github.com/3rd-Eden/memcached#options)}
*/
const MemcachedStorage = new Storage(config.get('storage:memcached:hosts'), config.get('storage:memcached'));

const service = module.exports = new Service(config);

const resourceMgr = service.resourceManager;
resourceMgr.register('cache', MemcachedStorage);
//...
```
