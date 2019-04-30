import * as React from 'react'

export default function NotFound ({ location }) {
  return (
    <>
      <h1>NotFound</h1>
      <code>{location.pathname}</code>
    </>
  )
}
