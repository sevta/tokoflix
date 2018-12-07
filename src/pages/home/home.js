import React from 'react'
import { AppContext , MovieContext } from '../../app.js'
import { apikey , apiUrl } from '../../utils/api'
import queryString from 'query-string' 
import Movie from './movie'
import { Link } from 'react-router-dom'

function Home(props) {
  const {movieState , movies , moviesTrending} = React.useContext(MovieContext)
  const [currentPage , setCurrentPage] = React.useState(1)
  
  const renderMovie = (movies) => {
    return movies.length !== 0 ? movies.results.map((movie , i) => (
      <Movie key={i} details={movie} />
    )) : (
      <h1>Loading...</h1>
    )
  }

  React.useEffect(() => {
    let param = props.location.search
    console.log('param' , queryString.parse(param))
    console.log(props)
  })

  return (
    <div className='w-full mt-12'>
      <div className="container mx-auto mb-10">
        <h1 className='text-center text-5xl'>Tokoflix</h1>    
      </div>
      <button onClick={() => setCurrentPage(prev => prev+1)}>
        <Link to={`/?page=${currentPage}`}>goto</Link>
      </button>
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

export default Home