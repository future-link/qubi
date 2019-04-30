import * as React from 'react'
import usePromise from 'react-use-promise'

import Config from '../config'
import Post from '../components/Post'

export default ({ id = 'local' }: { id?: string }) => {
  const [result,error,state] = usePromise(
    () => fetch(Config.api + '/flows/' + id).then(r => r.json()),
    [id]
  )

  if (state !== 'resolved') {
    return error ? (<>{error.message}</>) : (<>UNRESOLVED!</>)
  }

  const { users = [], posts = [] } = result._embedded
  const usersById = users.reduce((uBI, user) => ({...uBI, [user.id]: user}), {})

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Post post={post} author={usersById[post.author]} />
        </li>
      ))}
    </ul>
  )
}
