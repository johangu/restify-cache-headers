const etagGenerator = require('etag')
const etagCache = {}
let etagGeneratorOptions

function check(options = {}) {
  etagGeneratorOptions = options

  return function(req, res, next) {
    if(!['GET', 'HEAD'].includes(req.method)) return next()

    if(req.url in etagCache) {
      const {etag, lastModified} = etagCache[req.url]

      res.etag = etag
      res.set('ETag', etag)
      res.set('Last-Modified', lastModified)
    }
    return next()
  }
}

function write(req, res, route, error) {
  // Add more status codes if needed
  if([200].includes(res.statusCode)) {
    const etag = etagGenerator(JSON.stringify(res._body), etagGeneratorOptions)
    const lastModified = new Date()
    etagCache[req.url] = {
      etag,
      lastModified
    }
  }
}

module.exports = {
  check,
  write
}
