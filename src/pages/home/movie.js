import React from 'react'
import { Link } from 'react-router-dom'
import { imgUrl } from '../../utils/api'
import { TiArrowForward , TiHeartFullOutline } from 'react-icons/ti'
import { FiHeart , FiShoppingCart } from 'react-icons/fi'
import { UserContext, MovieContext } from '../../utils/provider';
import { IoMdCart } from 'react-icons/io'

const SingleMovieContext = React.createContext('singlemovie')

export default function Movie({details , onAddCart , onDeleteFromCart , onClick}) {
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
                <Link to={`details/${details.id}`} className='no-underline text-white font-bold text-xl ml-2'>
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

function WishList({item}) {
  const context = React.useContext(UserContext)
  const [toggleWishList , setToggleWishList] = React.useState(false)


  function selectWishList() {
    setToggleWishList(prev => !prev)
    console.log('details wishlist' , item)
  }

  return (
    <div className="wishlist text-white" onClick={selectWishList}>
      { toggleWishList ? <TiHeartFullOutline /> : <FiHeart /> }
    </div>  
  )
}

function Price({rating}) {
  const [price , setPrice] = React.useState(0)

  React.useEffect(() => {
    let fixRating = parseInt(rating)

    if (fixRating > 6) {
      console.log('price high')
    }

    if (fixRating == 0 && fixRating <= 3) {
      setPrice(3500)
    } else if (fixRating > 3 && fixRating <= 6) {
      setPrice(8250)
    } else if (fixRating > 6 && fixRating <= 8) {
      setPrice(16360)
    } else if (fixRating > 8 && fixRating <= 10) {
      setPrice(21250)
    } else {
      console.warn('price error')
    }

  } , [])

  return (
    <div className='price-container'>
      <div className="price text-sm font-bold">{price}</div>
    </div>
  )
}

function MovieCart({item , onAddCart}) {
  const [toggleCart , setToggleCart] = React.useState(false)
  const { cart , action } = React.useContext(MovieContext)
  const { setAddToCart , onDeleteFromCart , onClick } = React.useContext(SingleMovieContext)

  function addToCart() {
    setToggleCart(prev => !prev)
    onClick(item)
  }

  React.useEffect(() => {

    for (let i in cart) {
      // console.log(cart[i].id == item.id)      
      if (cart[i].id == item.id) {
        console.log('toggling' , item)
        setToggleCart(true)
      } else {
        setToggleCart(false)
        console.log('delete item')
      }
    }


  } , {cart})

  
  // React.useEffect(() => {
  //   if (toggleCart) {
  //      console.log('click add cart')
  //     setAddToCart(item)
  //   } else {
  //     console.log('click remove cart')
  //     onDeleteFromCart(item)
  //   }
  // } , [toggleCart])


  return (
    <div className='cart-container mr-3 text-white' onClick={addToCart}>
      {toggleCart ? <IoMdCart /> : <FiShoppingCart />}
    </div>
  )
}