module.exports = ({ id: aId, posts: aPosts } = {}) => {
  const id = aId || require('uuid/v4')()
  const posts = aPosts || new Array(20).fill(null).map(() => require('./post')())

  const users = Object.values(
    posts.map(
      p => p._embedded.users
    ).reduce(
      (p, c) => [...p, ...c]
    ).reduce(
      (o, user) => ({...o, [user.id]: user}), {}
    )
  )

  return {
    "id": id,
    "count": posts.length,
    "_links": {
      "self": { "href": "/flows/" + id },
      "next": {
        "href": `/flows/${id}?after=${posts[0].id}`
      },
      "previous": {
        "href": `/flows/${id}?before=${posts.slice(-1)[0].id}`
      }
    },
    "_embedded": {
      users,
      posts,
    }
  }
}
