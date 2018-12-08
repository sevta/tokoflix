import React from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { MovieContext } from '../../utils/provider'

export default function Cart() {
  const {toggleCart , action} = React.useContext(MovieContext)

  return toggleCart && (
    <div className='cart-overlay fixed pin-y pin-x bg-black z-50 flex items-center justify-center' onClick={() => action.setToggleCart(false)}>
      <div className="cart-inner bg-white p-5 relative rounded" onClick={e => e.stopPropagation()}>
        <div className="close absolute pin-r pin-t text-3xl mt-3 mr-3 cursor-pointer" onClick={() => action.setToggleCart(false)}>
          <IoIosCloseCircleOutline />
        </div>
        <h3>list cart</h3>
      </div>  
      <style jsx sass>{`
        .cart-overlay {
          background: rgba($color: black , $alpha: .8);
          z-index: 1000;
          .cart-inner {
            width: 480px;
          }
        }
      `}</style>
    </div>
  )
}