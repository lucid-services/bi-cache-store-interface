# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## 1.2.0

* [ADDED] new `memjs` memcache provider
* [CHANGED] changed project name

## 1.1.1

* [FIXED] if an attempt to initialize `Memcached` store with invalid arguments is made, the Memcached constructor should throw an Error
* [FIXED] invalid multi-inheritance Memcached setup (EventEmitter interface was not part of Memcached prototype)

## 1.1.0

* [ADDED] `CacheStoreInterface` must implement `inspectIntegrity` method

## 1.0.1

* [CHANGED] change API so that it does NOT collide with `express-session` store API - `get` -> `fetch`, `set` -> `settle`

## 1.0.0

* [ADDED] `CacheStoreInterface`
* [ADDED] `Memcached` CacheStoreInterface implementation
