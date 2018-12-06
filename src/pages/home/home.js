import React from 'react'
import { AppContext , MovieContext } from '../../app.js'
import { apikey , apiUrl } from '../../utils/api'

export default function Home() {
  const {movieState} = React.useContext(MovieContext)
  const [movieData , setMovieData] = React.useState()

  React.useEffect(() => {
    console.log('Movie context' , movieState)
  })

  return (
    <div className='container mx-auto mt-10'>
      <h1>home...</h1>
    </div>
  )
}