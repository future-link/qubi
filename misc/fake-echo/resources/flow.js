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
        "href": `/flows/${id}?after=1a2e11fd-5bb7-4680-8ff7-23ab48c21d4b`
      },
      "previous": {
        "href": `/flows/${id}?before=1a2e11fd-5bb7-4680-8ff7-23ab48c21d4b`
      }
    },
    "_embedded": {
      users,
      posts,
    }
  }
}
