import * as React from 'react'

export default function Post ({ post, author }: { post: any, author: any }) {
  const { handle } = author
  const { text, createdAt } = post

  return (
    <article>
      <p>
        {text}
      </p>
      <footer>
        Posted on <time dateTime={createdAt}>{createdAt}</time> by <b>@{handle}</b>
      </footer>
    </article>
  )
}
