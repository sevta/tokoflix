import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter , Route , Switch , Link } from 'react-router-dom'

// pages
import Home from './pages/home/home'
import { apikey , apiUrl } from './utils/api'

console.log('api key' , apikey)

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

  React.useEffect(() => {
    console.log(movieState)
    console.log('api' , apiUrl , apikey , `${apiUrl}movie/now_playing?api_key=${apikey}&region=ID`)
    fetch(`${apiUrl}movie/now_playing?api_key=${apikey}&region=ID`)
      .then(res => res.json())
      .then(data => movieDispatch({ type: 'init movies' , payload: data }))
      .catch(err => console.log(err))
  } , [])

  return (
    <AppContext.Provider value={{userState , userDispatch}}>
      <MovieContext.Provider value={{movieState , movieDispatch}}>
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </HashRouter>
      </MovieContext.Provider>
    </AppContext.Provider>
  )  
}

let app = document.querySelector('#app')
ReactDOM.render(<Roots /> , app)