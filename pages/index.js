import S1 from 's1db'
import fetch from 'isomorphic-unfetch'
import { useState, useRef } from 'react'

export default ({ initialCounter }) => {
  const [ counter, setCounter ] = useState(initialCounter)

  return (
    <div>
      <h1>Push the button!</h1>

      <button onClick={() => {
        setCounter(counter + 1)
        fetch('/api/increment')
      }}>
        Pressed {counter} times
      </button>
    </div>
  )
}

export const getServerSideProps = async () => {
  const db = new S1(process.env.S1_TOKEN)
  return {
    props: {
      initialCounter: await db.get('counter') ?? 0
    }
  }
}