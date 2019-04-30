module.exports = ({ id: aId, handle: aHandle } = {}) => {
  const id = aId || require('uuid/v4')()
  const handle = aHandle || require('docker-names').getRandomName()

  return {
    id,
    handle,
    "name": null,
    "_links": {
      "self": {
        "href": "/users/" + id
      }
    },
    "_embedded": {}
  }
}
