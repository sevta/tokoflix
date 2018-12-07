import React from 'react'
import { imgUrl } from '../../utils/api'

export default function BackDrop({img}) {
  return ( 
    <div className='w-full bg-grey-lightest overflow-hidden backdrop-container'>
      <img src={`${imgUrl}original${img}`} alt="" className='img w-full'/>
      
      <style jsx>{`
        .backdrop-container {
          height: 600px;
        }
        @media (max-width: 1366px) {
          .backdrop-container {
            height: 300px;
          }   
        }
        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }

      `}</style>
    </div>
  )
}