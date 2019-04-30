import * as React from 'react'
import usePromise from 'react-use-promise'

import Config from '../config'
import Post from '../components/Post'

export default ({ id = 'local' }: { id: string }) => {
  const [result,error,state] = usePromise(
    () => fetch(Config.api + '/flows/' + id).then(r => r.json()),
    [id]
  )

  if (state !== 'resolved') {
    return (<>UNRESOLVED!</>)
  }

  const { users, posts } = result._embedded
  const usersById = users.reduce((uBI, user) => ({...uBI, [user.id]: user}), {})

  return (
    <>
      {posts.map(post => (
        <Post key={post.id} post={post} author={usersById[post.author]} />
      ))}
    </>
  )
}
