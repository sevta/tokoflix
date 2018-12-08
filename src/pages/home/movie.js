import React , { Component } from 'react'
import { Link } from 'react-router-dom'
import { imgUrl } from '../../utils/api'
import { TiArrowForward , TiHeartFullOutline } from 'react-icons/ti'
import { FiHeart , FiShoppingCart } from 'react-icons/fi'
import { UserContext, MovieContext } from '../../utils/provider';
import { IoMdCart } from 'react-icons/io'
import slugify from 'slugify'

const SingleMovieContext = React.createContext('singlemovie')
export default function Movie({details , onAddCart , onDeleteFromCart , onClick}) {
    React.useEffect(() => {
      console.log()
    } , [])

   return (
    <SingleMovieContext.Provider
      value={{ 
        setAddToCart: payload => onAddCart(payload) ,
        onDeleteFromCart: payload => onDeleteFromCart(payload) ,
        onClick: payload => onClick(payload)
      }}
    >
      <div className='movie-details container relative w-48 mx-5 mb-5 flex flex-wrap flex-col bg-white'>
        <div className='movie-top w-full h-64 d relative cursor-pointer overflow-hidden rounded'> 
          <img className='movie-poster absolute w-full h-full pin-t pin-l' src={`${imgUrl}original${details.poster_path}`} alt=""/>
          <div className="overlay absolute pin-y p-3 pin-x flex flex-col justify-end">
            <div className="menu-bottom flex justify-between">
              <div className='menu-left z-30 font-bold text-white'>
                <Price rating={details.vote_average} />
              </div>
              <div className="menu-right flex items-center">  
                <MovieCart item={details} />
                <WishList item={details} />
                <Link to={`details/${details.id}-${slugify(details.title , '-')}`} className='no-underline text-white font-bold text-xl ml-2'>
                  <TiArrowForward />
                </Link>
              </div>
            </div>
          </div>        
        </div>   
        <h5 className='rating bg-teal font-bold text-white z-20'>{details.vote_average}</h5>
        <div className="bottom">
          <h5 className='mt-3 text-teal-dark'>{details.title}</h5>
        </div>

        <style jsx sass>{`
          .overlay {
            transition: all .3s ease;
            opacity: 0;
            background: rgba($color: #4dc0b5 , $alpha: .9);
            z-index: -1;
          }
          .date-font {
            font-size: 13px;
          }
          .movie-details {
            transition: all .4s ease;
            &:hover {
              transform: translateY(-10px);
              .overlay {
                opacity: 1;
                z-index: 3;
              }
            }
          }
          .rating {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -10px;
            right: -10px;
            border-radius: 50%;
          }
        `}</style>
      </div>
    </SingleMovieContext.Provider>
  )
}

// props item
class WishList extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    toggleWishList: false 
  }

  selectWishList = () => {
    this.setState({ toggleWishList: !this.state.toggleWishList })
  }

  render() {
    return (
      <div className="wishlist text-white" onClick={this.selectWishList}>
        { this.state.toggleWishList ? <TiHeartFullOutline /> : <FiHeart /> }
      </div>  
    )
  }
}

// props rating
class Price extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    price: 0
  }

  componentDidMount() {
    let fixRating = parseInt(this.props.rating)

    if (fixRating > 6) {
      console.log('price high')
    }

    if (fixRating == 0 && fixRating <= 3) {
      this.setState({ price: 3500 })
    } else if (fixRating > 3 && fixRating <= 6) {
      this.setState({ price: 8250 })
    } else if (fixRating > 6 && fixRating <= 8) {
      this.setState({ price: 16360 })
    } else if (fixRating > 8 && fixRating <= 10) {
      this.setState({ price: 21250 })
    } else {
      console.warn('price error')
    }
  }

  render() {
    return (
      <div className='price-container'>
        <div className="price text-sm font-bold">{this.state.price}</div>
      </div>
    )
  }
}

// props item onAddCart
class MovieCart extends Component {
  constructor(props) {
    super(props)
  }

  static contextType = MovieContext
  
  state = {
    toggleCart: false
  }

  addToCart = () => {
    this.setState({ toggleCart: !this.state.toggleCart })
  }

  componentDidMount() {
    const { cart } = this.context 
    for (let i in cart) {
      if (cart[i].id == this.props.item.id) {
        this.setState({ toggleCart: true })
      } else {
        this.setState({ toggleCart: false })
        console.log('delete item')
      }
    }
  }

  render() {
    return (
      <div className='cart-container mr-3 text-white' onClick={() => this.addToCart()}>
        {this.state.toggleCart ? <IoMdCart /> : <FiShoppingCart />}
      </div>
    )
  }
}