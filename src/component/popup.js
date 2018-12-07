import React from 'react'
import { UserContext } from '../app'

export default function Popup({show}) {
  const {userState , setUser , setIsNewUser} = React.useContext(UserContext)
  const [value , setValue] = React.useState('')
  const [submited , setSubmited] = React.useState(false)
  /**
   * TODO:
   * basic validate input username
   * 
   */
  function onChange(e) {
    let val = e.target.value
    setValue(val)
  }

  React.useEffect(() => {
    if (submited) {
      setIsNewUser(false)
      localStorage.setItem('user' , JSON.stringify(userState))
    }
  } , [userState])

  function onSubmit(e) {
    e.preventDefault()
    setUser({...userState , username: value})
    setSubmited(true)
  }

  return show && (
    <div className='popup bg-black fixed pin-y pin-x flex items-center justify-center z-50'>
      <div className="popup-inner bg-white py-2 px-5">
        <form className="form" onSubmit={onSubmit}>
          <div className="">
            <input type="text" placeholder='username' onChange={onChange} 
              className='w-full border py-2 px-2'/>
          </div>
        </form>
      </div>
    </div>
  )
}