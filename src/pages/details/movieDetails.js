import React from 'react'
import { apikey , apiUrl , fetchUrl } from '../../utils/api'
import BackDrop from './backdrop'
import { AppContext , MovieContext } from '../../app'

export default function MovieDetails({match}) {
  const context = React.useContext(MovieContext)

  const [movieID , setMovieID] = React.useState('')
  const [movieDetails , setMovieDetails] = React.useState([])
  const [loading , setLoading] = React.useState(true)


  React.useEffect(() => {
    let mID = match.params.movieId
    let url = fetchUrl(apikey , `movie/${mID}`)
    
    context.setCurrentUrl(match.path)

    fetch(url)
      .then(res => res.json())
      .then(data => setMovieDetails(data))
      .catch(err => console.error(err))
  } , [])

  React.useEffect(() => {
    if (movieDetails) {
      setLoading(false)
    }
  } , [movieDetails])  

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <React.Fragment>
          <BackDrop img={movieDetails.backdrop_path}/>
          <div className="movie-details-content" style={{height: '200vh'}}>
            <div className="container mx-auto">
              <h1>content goes here</h1>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}