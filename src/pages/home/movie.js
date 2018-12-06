import React from 'react'
import { Link } from 'react-router-dom'
import { imgUrl } from '../../utils/api'

export default function Movie({details}) {
  return (
    <Link to='/details' className='no-underline text-black'>
      <div className='movie-details-container w-48 m-5 flex flex-wrap flex-col bg-white'>
        <div className='top w-full h-64 d relative cursor-pointer overflow-hidden rounded'> 
          <img className='absolute w-full h-full pin-t pin-l' src={`${imgUrl}original${details.poster_path}`} alt=""/>
        </div>
        <div className="bottom mt-3">
          <h5>{details.title}</h5>      
          <h5 className='mt-1 text-green-dark font-bold p-1'>{details.vote_average}</h5>
        </div>    
      </div>
    </Link>
  )
}