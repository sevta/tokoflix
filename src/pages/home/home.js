import React from 'react'
import { AppContext , MovieContext } from '../../app.js'
import { apikey , apiUrl } from '../../utils/api'
import queryString from 'query-string' 
import Movie from './movie'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'

function Home(props) {
  // movie context
  const {movieState , movies , moviesTrending , currentPage , setCurrentPage} = React.useContext(MovieContext)

  // render per movie
  const renderMovie = (movies) => {
    return movies.length !== 0 ? movies.results.map((movie , i) => (
      <Movie key={i} details={movie} />
    )) : (
      <h1>Loading...</h1>
    )
  }

  // handlechange per page
  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber)
  }

  // set current page if state current page changed
  React.useEffect(() => {
    console.log('page change' , currentPage)
    props.history.push(`/?page=${currentPage}`)
  } , [currentPage])

  return (
    <div className='w-full mt-12'>
      <div className="container mx-auto mb-10">
        <h1 className='text-center text-5xl'>Tokoflix</h1>    
      </div>
      <Pagination 
        activePage={currentPage}
        itemsCountPerPage={2} 
        totalItemsCount={20}
        pageRangDisplayed={5}
        onChange={handlePageChange}
      />
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