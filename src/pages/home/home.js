import React from 'react'
import { AppContext } from '../../app.js'

export default function Home() {
  const context = React.useContext(AppContext)

  React.useEffect(() => {
    console.log('context' , context)
  })

  return (
    <div className='container mx-auto mt-10'>
      <h1>home...</h1>
    </div>
  )
}