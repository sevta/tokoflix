import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter , Route , Switch , Link } from 'react-router-dom'

// pages
import Home from './pages/home/home'
import MovieDetails from './pages/details/movieDetails'
import Popup from './component/popup'

// component
import Navbar from './component/navbar/navbar'

// utils
import { apikey , apiUrl } from './utils/api'

// data user
const initUserState = {
  username: 'tesi'
}

function userReducer(state , action) {
  switch (action.type) {
    default : {
      return state
    }
  }
}

// movies state
const initMovieState = {
  movies: []
}

function movieReducer(state , action) {
  switch (action.type) {
    case 'init movies' : {
      return {
        ...state ,
        movies: action.payload
      }
    }
    default : {
      return state
    }
  }
}

export const UserContext = React.createContext('AppContext')
export const MovieContext = React.createContext('MovieContext')

function Roots() {
  // reducer
  // const [userState , userDispatch] = React.useReducer(userReducer , initUserState)
  const [movieState , movieDispatch] = React.useReducer(movieReducer , initMovieState)

  // state movies
  const [movies , setMovies] = React.useState([])
  const [moviesTrending , setMoviesTrending] = React.useState([])
  const [currentPage , setCurrentPage] = React.useState(1)
  const [currentUrl , setCurrentUrl] = React.useState('')

  // user state
  const [isNewUser , setIsNewUser] = React.useState(false)
  const [userState , setUser] = React.useState({
    username: '' ,
    wishlist: []
  })

  function fetchUrl(query , page) {
    let url = `${apiUrl}${query}?api_key=${apikey}&region=ID&page=${page}}`
    console.log(url)
    return url
  }
  
  React.useEffect(() => {
    // fetch top rated data
    console.log('fetch url' , fetchUrl('movie/popular' , 20))
    fetchMovies(fetchUrl('movie/popular' , 20) , (err , data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('top rated'  , data)
        setMoviesTrending(data)
      }
    })
    console.log('current page change' , currentPage)
  } , [currentPage])


  // didmount
  React.useEffect(() => {
    let userStorage = localStorage.getItem('user')
    
    // fetch now playing
    fetchMovies(fetchUrl('movie/now_playing' , 1) , (err , data) => {
      if (err) throw err
      movieDispatch({ type: 'init movies' , payload: data })
      setMovies(data)
    })

    // fetch top rated data
    fetchMovies(fetchUrl('movie/popular' , 1) , (err , data) => {
      if (err) throw err
      console.log('top rated'  , data)
      setMoviesTrending(data)
    })

    if (userStorage == null) {
      setIsNewUser(true)
    } else {
      console.log('current user' , userStorage)
      setUser(userStorage)
    }
    
  } , [])


  const fetchMovies = (url , callback) => {
    let err = false
    fetch(url)
      .then(res => res.json())
      .then(data => {
        err = false
        callback(err , data)
      })
      .catch(err => {
        err = true 
        callback(err , data)
      })
  }


  return (
    <UserContext.Provider value={
      {
        userState , 
        setUser: payload => setUser(payload) ,
        isNewUser ,
        setIsNewUser: payload => setIsNewUser(payload)
      }
    }>
      <MovieContext.Provider value={
        {
          movieState , 
          movieDispatch , 
          movies , 
          moviesTrending ,
          currentPage ,
          setCurrentPage: payload => setCurrentPage(payload) ,
          currentUrl ,
          setCurrentUrl: payload => setCurrentUrl(payload)
        }
      }>
        <Popup show={isNewUser} />
        <Navbar />
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/details/:movieId' component={MovieDetails} />
          </Switch>
        </HashRouter>
      </MovieContext.Provider>
    </UserContext.Provider>
  )  
}

let app = document.querySelector('#app')
ReactDOM.render(<Roots /> , app)