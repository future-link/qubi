module.exports = ({ id: aId } = {}) => {
  const id = aId || require('uuid/v4')()

  return {
    "id": id,
    "handle": 'H' + id,
    "name": null,
    "_links": {
      "self": {
        "href": "/users/" + id
      }
    },
    "_embedded": {}
  }
}
