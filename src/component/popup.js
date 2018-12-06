import React from 'react'

export default function Popup({show}) {
  return show && (
    <div className='popup bg-black fixed pin-y pin-x flex items-center justify-center z-50'>
      <div className="popup-inner bg-white p-2">
        <h1>username</h1>
      </div>
    </div>
  )
}