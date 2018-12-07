import React from 'react'
import { MovieContext , UserContext } from '../../app'

export default function Navbar() {
  const { currentUrl } = React.useContext(MovieContext)
  const { userState } = React.useContext(UserContext)
  const [classes , setClasses] = React.useState('')

  React.useEffect(() => {
    console.log('username' , userState)
  } , [userState] )

  React.useEffect(() => {
    if (currentUrl == '/details/:movieId') {
      setClasses('in-page-details')
    } else {
      setClasses('')
    }
  } , [currentUrl])

  return (
    <div className={`w-full px-2 py-6 shadow bg-white ${classes}`}>
      <div className="container flex mx-auto items-center justify-between">
        <div className="left">
          <div className="logo font-bold text-2xl">logo</div>
        </div>
        <div className="right flex">
          <div className="user-info">
            <div className="username font-bold">{userState.username}</div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .in-page-details {
          position: absolute;
          top: 600px;
        }
        @media (max-width: 1366px) {
          .in-page-details {
            top: 300px;
          }   
        }
      `}</style>
    </div>
  )
}