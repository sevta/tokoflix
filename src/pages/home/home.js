import React from 'react'
import { AppContext , MovieContext } from '../../utils/provider'
import { apikey , apiUrl } from '../../utils/api'
import queryString from 'query-string' 
import Movie from './movie'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Banner from './banner'

const menu = [
  'Now Playing' , 
  'Trending' ,
  'Search'
]

function Home(props) {
  // movie context
  const {
    movieState , 
    movies , 
    moviesTrending , 
    currentPage , 
    action , 
    cart ,
    setCurrentUrl
  } = React.useContext(MovieContext)

  const [menuSelect , setMenuSelect] = React.useState('')

  function onCartClick(item) {
    console.log('oncart click' , item)
    if (cart.includes(item)) {
      console.log('delete')
      const indexToDelete = cart.indexOf(item)
      cart.splice(indexToDelete , 1)
      action.addToCart([...cart])
      localStorage.setItem('cart' , JSON.stringify(cart))        
    } else {
      action.addToCart([...cart , item])
      localStorage.setItem('cart' , JSON.stringify(cart))        
      console.log('add')
    }
  }

  React.useEffect(() => {
    console.log('cart now' , cart)
  } , [cart])

  // render per movie
  const renderMovie = (movies) => {
    return movies.length !== 0 ? movies.results.map((movie , i) => (
      <Movie key={i} details={movie} onClick={onCartClick} />
    )) : (
      <h1>Loading...</h1>
    )
  }

  React.useEffect(() => {
    action.setCurrentUrl('/')
  } , [])

  // handlechange per page
  function handlePageChange(pageNumber) {
    action.setCurrentPage(pageNumber)
  }

  function onMenuSelected(menu) {
    console.log('menu selecte' , menu)
  }

  // set current page if state current page changed
  React.useEffect(() => {
    console.log('page change' , currentPage)
    if (currentPage == 1) {
      props.history.push(`/`)      
    } else {
      props.history.push(`/?page=${currentPage}`)
    }
  } , [currentPage])


  return (
    <div className='w-full'>
      <Banner />
      <Menu onMenuSelected={onMenuSelected} />
      <div>
        <div className="container mx-auto">
          <h1 className='ml-5 mb-3 font-sans font-normal text-green'>Now playing</h1>
        </div>
        <div className="movie-container container mx-auto flex flex-wrap items-center">
          {renderMovie(movies)}
        </div>
      </div>
      <div className='mt-10'>
        <div className="container mx-auto">
          <h1 className='ml-5 mb-3 font-sans font-normal text-green'>Trending</h1>
        </div>
        <div className="movie-container container mx-auto flex flex-wrap items-center">
          {renderMovie(moviesTrending)}
        </div>
      </div>
      <Pagination 
        activePage={currentPage}
        itemsCountPerPage={2} 
        totalItemsCount={20}
        pageRangDisplayed={5}
        onChange={handlePageChange}
      />
    </div>
  )
}

function Menu({onMenuSelected}) {
  const [menuSelected , setMenuSelected] = React.useState('')
  function onMenuSelect(menu) {
    // setMenuSelected(menu)
    setMenuSelected(menu)
    console.log(menu)
  }

  React.useEffect(() => {
    onMenuSelected(menuSelected)
  } , [menuSelected])


  return (
    <div className='container mx-auto flex justify-center'>
      {menu.map((menu , i) => (
        <div className="menu-list mr-5 text-md text-grey cursor-pointer" onClick={() => onMenuSelect(menu)}>{menu}</div>
      ))}
    </div>  
  )
}

export default Home