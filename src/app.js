import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter , Route , Switch , Link } from 'react-router-dom'

// pages
import Home from './pages/home/home'
import MovieDetailsPage from './pages/details/movieDetailsPage'
import Popup from './component/popup'
import Cart from './component/cart/cart'

// component
import Navbar from './component/navbar/navbar'

// utils
import { Provider , UserContext } from './utils/provider'


function Roots() {

  return (
    <Provider>
      <Popup show={false} />
      <Navbar />
      <Cart />
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/details/:movieId-:slug' component={MovieDetailsPage} />
        </Switch>
      </HashRouter>
      <style jsx global>{`
        @font-face {
          font-family: 'bebas';
          src: url('./font/BebasNeue-Regular.ttf') format('truetype')          
        }
  
      `}</style>
    </Provider>
  )  
}

let app = document.querySelector('#app')
ReactDOM.render(<Roots /> , app)