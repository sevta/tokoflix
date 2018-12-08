import React from 'react'
import { apikey , apiUrl , fetchUrl , imgUrl } from '../../utils/api'
import BackDrop from './backdrop'
import { AppContext , MovieContext } from '../../utils/provider'


export default function MovieDetailsPage({match}) {
  const context = React.useContext(MovieContext)

  const [movieID , setMovieID] = React.useState('')
  const [movieDetails , setMovieDetails] = React.useState([])
  const [loading , setLoading] = React.useState(true)


  React.useEffect(() => {
    let mID = match.params.movieId
    let url = fetchUrl(apikey , `movie/${mID}`)
    
    context.action.setCurrentUrl(match.path)

    fetch(url)
      .then(res => res.json())
      .then(data => setMovieDetails(data))
      .catch(err => console.error(err))
  } , [])

  React.useEffect(() => {
    if (movieDetails) {
      console.log('movie details' , movieDetails)
      setLoading(false)
    }
  } , [movieDetails])  

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <React.Fragment>
          { movieDetails.backdrop_path ? 
            <BackDrop img={movieDetails.backdrop_path} /> : 
            <BackDrop img={movieDetails.poster_path} /> }
          <div className="movie-details-content flex items-center justify-center flex-col">
            <div className="container mx-auto flex mt-10">
              <MovieDetailsCard details={movieDetails} />
            </div>
            <div className="container mx-auto flex items-center justify-center mt-10">

            </div>
          </div>
        </React.Fragment>
      )}
      <style jsx global sass>{`
        body {
          background: whitesmoke;
        }
        .movie-details-content {
          min-height: 100vh;
        }
      `}</style>
    </div>
  )
}

function MovieDetailsCard({details}) {
  return (
    <div className="col w-2/3 flex bg-white shadow mx-auto mt-14 rounded-lg overflow-hidden">
      <div className="col-left">
        <div className="poster-container w-48 border overflow-hidden">
          <img src={`${imgUrl}original${details.poster_path}`} alt="" className='poster'/>
        </div>
      </div>
      <div className="col-right ml-5 px-5 py-6 flex flex-col justify-center">
        <div className="h-title text-2xl mb-4 font-sans font-bold">{details.title}</div>
        <MovieDetailsContent title='Tag' content={details.tagline} />
        <MovieDetailsContent title='Release' content={details.release_date} />
        <MovieDetailsContent title='Overview' content={details.overview} />
        <button className='rounded-full text-teal font-bold btn-addCart'>add to cart</button>
        <div className="genres flex mt-5">
          {details.length !== 0 ? details.genres.map((genre , index) => (
            <div className='mr-2 py-1 px-3 font-sans text-sm bg-red-light rounded-full text-white'>
              <div>{genre.name}</div>
            </div>
          )) : (<h1>loading...</h1>)}
        </div>

      </div>
      <style jsx sass>{`
        .poster-container {
          width: 240px;
          height: 100%;
        }
        .btn-addCart {
          width: 185px;
        }
        .poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      `}</style>
    </div>  
  )
}

function MovieDetailsContent({title , content}) {
  return (
    <div className="mb-5">
      <div className='text-sm mb-1 font-bold'>{title}</div>
      <h5 className="font-normal leading-normal">{content == "" ? "-" : content}</h5>
    </div>
  )
}

function Genres({genre}) {
  React.useEffect(() => {
    console.log('genre' , genre)
  } , {genre})
  return (
    <h1>genre</h1>
  )
}
