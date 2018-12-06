import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter , Route , Switch , Link } from 'react-router-dom'

// pages
import Home from './pages/home/home'
import MovieDetails from './pages/details/movieDetails'
import Popup from './component/popup'

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

export const AppContext = React.createContext('AppContext')
export const MovieContext = React.createContext('MovieContext')

function Roots() {
  const [userState , userDispatch] = React.useReducer(userReducer , initUserState)
  const [movieState , movieDispatch] = React.useReducer(movieReducer , initMovieState)
  const [movies , setMovies] = React.useState([])
  const [moviesTrending , setMoviesTrending] = React.useState([])

  function fetchUrl(query , region) {
    return `${apiUrl}${query}?api_key=${apikey}&region=ID`
  }

  React.useEffect(() => {
    // fetch now playing
    fetchMovies('movie/now_playing' , (err , data) => {
      if (err) throw err
      movieDispatch({ type: 'init movies' , payload: data })
      setMovies(data)
    })

    // fetch top rated data
    fetchMovies('movie/popular' , (err , data) => {
      if (err) throw err
      console.log('top rated'  , data)
      setMoviesTrending(data)
    })
  } , [])

  const fetchMovies = (url , callback) => {
    let err = false
    fetch(fetchUrl(url))
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
    <AppContext.Provider value={{userState , userDispatch}}>
      <MovieContext.Provider value={{movieState , movieDispatch , movies , moviesTrending}}>
        <Popup show={false} />
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/details' component={MovieDetails} />
          </Switch>
        </HashRouter>
      </MovieContext.Provider>
    </AppContext.Provider>
  )  
}

let app = document.querySelector('#app')
ReactDOM.render(<Roots /> , app)