import React from 'react'
import { apikey , apiUrl } from './api'

export const UserContext = React.createContext('UserContext')
export const MovieContext = React.createContext('MovieContext')
export const AppContext = React.createContext('AppContext')

export function Provider(props) {
  return (
    <AppContext.Provider>
      <UserProvider>
        <MovieProvider>
          {props.children}
        </MovieProvider>
      </UserProvider>
    </AppContext.Provider>
  )
}


function MovieProvider(props) {
  const [movies , setMovies] = React.useState([])
  const [moviesTrending , setMoviesTrending] = React.useState([])
  const [currentPage , setCurrentPage] = React.useState(1)
  const [currentUrl , setCurrentUrl] = React.useState('')
  const [toggleWishList , setToggleWishList] = React.useState(false)
  const [cart , addToCart] = React.useState([])
  const [toggleCart , setToggleCart] = React.useState(false)

  function fetchUrl(query , page) {
    let url = `${apiUrl}${query}?api_key=${apikey}&region=ID&page=${page}}`
    console.log(url)
    return url
  }
  
  React.useEffect(() => {
    console.log('add to cart' , cart)
    // localStorage.setItem('cart' , JSON.stringify(cart))        
    console.log(localStorage.getItem('cart'))
  } , [cart])

  React.useEffect(() => {
    let userStorage = localStorage.getItem('user')

    if (userStorage !== null) { 
        let currentCart = JSON.parse(localStorage.getItem('cart'))
        addToCart(currentCart)
        setTimeout(() => {
          console.log('if user storage not null ' , cart)
          console.log('if user storage not null ' , JSON.parse(localStorage.getItem('cart')))
        }, 300);
    } else {
      localStorage.setItem('cart' , JSON.stringify([]))
    }
    // fetch now playing
    fetchMovies(fetchUrl('movie/now_playing' , 1) , (err , data) => {
      if (err) throw err
      setMovies(data)
    })

    // fetch top rated data
    fetchMovies(fetchUrl('movie/popular' , 1) , (err , data) => {
      if (err) throw err
      console.log('top rated'  , data)
      setMoviesTrending(data)
    })
  } , [])

  // get new data if current page changed
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
        callback(err , null)
      })
  }


  const MoviesProvider = {
    movies , 
    moviesTrending ,
    currentPage ,
    currentUrl ,
    cart ,
    toggleCart ,
    action: {
      setCurrentPage: payload => setCurrentPage(payload) ,
      setCurrentUrl: payload => setCurrentUrl(payload) ,
      addToCart: payload => addToCart(payload) ,
      setToggleCart: payload => setToggleCart(payload)
    } ,
  }

  return (
    <MovieContext.Provider value={MoviesProvider}>
      {props.children}
    </MovieContext.Provider>
  )
}

function UserProvider(props) {
  // user state
  const [isNewUser , setIsNewUser] = React.useState(false)
  const [userState , setUser] = React.useState({
    username: '' ,
    wishlist: []
  })
  
  React.useEffect(() => {
    let userStorage = localStorage.getItem('user')

    if (userStorage == null) {
      setIsNewUser(true)
    } else {
      console.log('current user' , userStorage)
      setUser(JSON.parse(userStorage))
    }
  } , [])

  const usersProvider = {
    isNewUser ,
    userState , 
    action: {
      setUser: payload => setUser(payload) ,
      setIsNewUser: payload => setIsNewUser(payload)
    } ,
  }
  return (
    <UserContext.Provider value={usersProvider}>
      {props.children}
    </UserContext.Provider>
  )
}