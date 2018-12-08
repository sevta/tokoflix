import React , { Component } from 'react'
import { AppContext , MovieContext } from '../../utils/provider'
import { apikey , apiUrl , fetchUrl } from '../../utils/api'
import queryString from 'query-string' 
import Movie from './movie'
import { Link } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Banner from './banner'
import './pagination.css'

const menu = [
  'Now Playing' , 
  'Trending' ,
  'Search'
]

class Home extends Component {
  constructor(props) {
    super(props)
  }

  static contextType = MovieContext

  state = {
    menuSelect: '' ,
    loading: false 
  }

  componentDidMount() {
    const { action } = this.context
    let currentUrl = queryString.parse(this.props.location.search)
    console.log('home url' , currentUrl.page)
    if (currentUrl.page !== null) {
      action.setCurrentUrl(`/${currentUrl.page}`)
      this.updateMovies(currentUrl.page)
    } else {
      action.setCurrentUrl(`/`)
      this.updateMovies(1)
    }
  }

  onCartClick = item => {
    const { cart , action } = this.context 
    if (cart.includes(item)) {
      // console.log('delete')
      const indexToDelete = cart.indexOf(item)
      cart.splice(indexToDelete , 1)
      action.addToCart([...cart])
      localStorage.setItem('cart' , JSON.stringify(cart))        
    } else {
      action.addToCart([...cart , item])
      localStorage.setItem('cart' , JSON.stringify(cart))        
      // console.log('add')
    }
  }

  // render per movie
  renderMovie = movies => {
    return movies.length !== 0 ? movies.results.map((movie , i) => (
      <Movie key={i} details={movie} onClick={this.onCartClick} />
    )) : (
      <h1>Loading...</h1>
    )
  }

  // updated movies
  updateMovies = (currentPage) => {
    const { action } = this.context
    fetch(fetchUrl(apikey ,'movie/popular', `&region=ID&page=${currentPage}`))
    .then(res => res.json())
    .then(data => {
      action.setMoviesTrending(data , moviesTrending => {
        console.log('success updated data' , moviesTrending)
        if (currentPage == 1) {
          this.props.history.push(`/`)   
          this.setState({ loading: false })
        } else {
          this.props.history.push(`/?page=${currentPage}`)
          this.setState({ loading: false })
        }
      })
    })
    .catch(err => console.error(err))
  }

  // handlechange per page
  handlePageChange = pageNumber => {
    const { action } = this.context
    action.setCurrentPage(pageNumber , currentPage => {
      this.setState({ loading: true })
      this.updateMovies(currentPage)
    })
  }

  onMenuSelected = menu => {
    console.log('menu selecte' , menu)
  }

  render() {
    const {
      movieState , 
      movies , 
      moviesTrending , 
      currentPage , 
      action , 
      cart ,
      setCurrentUrl
    } = this.context
    return (
      <div className='w-full'>
        <Banner />
        <Menu onMenuSelected={this.onMenuSelected} />
        { this.state.loading ? (
          <h1>loading...</h1>
        ) : (
          <React.Fragment>
            <div>
              <div className="container mx-auto">
                <h1 className='ml-5 mb-3 font-sans font-normal text-green'>Now playing</h1>
              </div>
              <div className="movie-container container mx-auto flex flex-wrap items-center">
                {this.renderMovie(movies)}
              </div>
            </div>
            <div className='mt-10'>
              <div className="container mx-auto">
                <h1 className='ml-5 mb-3 font-sans font-normal text-green'>Trending</h1>
              </div>
              <div className="movie-container container mx-auto flex flex-wrap items-center">
                {this.renderMovie(moviesTrending)}
              </div>
            </div>
          </React.Fragment>
        ) }
        <Pagination 
          activePage={currentPage}
          itemsCountPerPage={2} 
          totalItemsCount={20}
          pageRangDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    )
  }

}

class Menu extends Component {
  constructor(props) {
    super(props) 
  }

  state = {
    menuSelected: ''
  }

  onMenuSelect = menu => {
    this.setState({ menuSelected: menu } , () => {
      this.props.onMenuSelected(menu)
    })
    console.log(menu)
  }

  render() {
    return (
      <div className='container mx-auto flex justify-center'>
        {menu.map((menu , i) => (
          <div className="menu-list mr-5 text-md text-grey cursor-pointer" onClick={() => this.onMenuSelect(menu)}>{menu}</div>
        ))}
      </div>  
    )
  }
}

export default Home