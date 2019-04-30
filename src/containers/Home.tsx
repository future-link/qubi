import * as React from 'react'

import Flow from './Flow'

export default function Home () {
  return (
    <>
      <h1>Home</h1>
      <form>
        <textarea />
        <button type="submit">投げ込む</button>
      </form>
      <Flow />
    </>
  )
}
