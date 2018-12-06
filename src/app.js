import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter , Route , Switch , Link } from 'react-router-dom'

// pages
import Home from './pages/home/home'

const initUserState = {
  username: 'tesi'
}

function reducer(state , action) {
  switch (action.type) {
    default : {
      return state
    }
  }
}

export const AppContext = React.createContext('AppContext')

function Roots() {
  const [userState , dispatch] = React.useReducer(reducer , initUserState)

  return (
    <AppContext.Provider value={{userState , dispatch}}>
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </HashRouter>
    </AppContext.Provider>
  )  
}

let app = document.querySelector('#app')
ReactDOM.render(<Roots /> , app)