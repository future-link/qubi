module.exports = ({ user: aUser, id: aId, createdAt: aCreatedAt, text: aText } = {}) => {
  const user = aUser || require('./user')()
  const id = aId || require('uuid/v4')()
  const createdAt = aCreatedAt || (new Date()).toISOString()
  const text = aText || `俺は静かに死ぬ`

  return {
    id,
    text,
    "author": user.id,
    createdAt,
    "visibility": "public",
    "_links": {
      "self": {
        "href": "/posts/" + id
      }
    },
    "_embedded": {
      "users": [user]
    }
  }
}
