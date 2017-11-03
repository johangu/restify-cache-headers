# restify-cache-headers
Automatically creates a cache of ETags upon a request of a changed route in a [restify](http://www.restify.com) application and adds `ETag` and `Last-Modified` headers to the response.

Created to work with [restify.plugins.conditionalRequest()](http://restify.com/docs/plugins-api/#conditionalrequest)

## Installation
`npm i restify-cache-headers`

## Usage

```javascript
const restify = require('restify')
const etagCache = require('restify-cache-headers')

const server = restify.createServer()

// IMPORTANT: Include the check before conditionalRequest plugin
server.use(etagCache.check([options]))
server.use(restify.plugins.conditionalRequest())

// This listener is needed to add previously uncached ETags to the cache
server.on('after', etagCache.write())
```

## Options
Passed onto [etag](https://github.com/jshttp/etag)
