import React from 'react'
import { AppContext , MovieContext } from '../../app.js'
import { apikey , apiUrl } from '../../utils/api'
import Movie from './movie'

export default function Home() {
  const {movieState , movies , moviesTrending} = React.useContext(MovieContext)

  const renderMovie = (movies) => {
    return movies.length !== 0 ? movies.results.map((movie , i) => (
      <Movie key={i} details={movie} />
    )) : (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className='w-full mt-12'>
      <div className="container mx-auto mb-10">
        <h1 className='text-center text-5xl'>Tokoflix</h1>    
      </div>
      <div>
        <div className="container mx-auto">
          <h1 className='ml-5 text-green'>indonesia</h1>
        </div>
        <div className="movie-container container mx-auto flex flex-wrap items-center">
          {renderMovie(movies)}
        </div>
      </div>
      <div className='mt-10'>
        <div className="container mx-auto">
          <h1 className='ml-5 text-green'>Trending</h1>
        </div>
        <div className="movie-container container mx-auto flex flex-wrap items-center">
          {renderMovie(moviesTrending)}
        </div>
      </div>
    </div>
  )
}