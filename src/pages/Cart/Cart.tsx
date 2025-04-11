import React from 'react'
import { useCartContext } from '../../Context/CartContext'
import NavBar from '../../components/NavBar/NavBar';
import CartCard from '../../components/CartCard/CartCard';
import './cart.css'

const Cart = () => {
const {dispatch,cart, cartTotal, cartItemTotal} = useCartContext();
  return (
    <>
    <NavBar />
   
    <div className='div-cart'>Cart Total: ${cartTotal}<br></br>
    Number of Items in Cart: {cartItemTotal}<br></br>
    <button className='check-out' onClick={()=>dispatch({type:"CHECKOUT",payload:cart})}>Checkout</button>
    </div>
    
    <div className="cart-cards">
        {
        cart.map((item)=>{   
                    
                       return(
                        <CartCard product={item} />
                       )
                    
                    })}
</div>
    </>
    
  )
}

export default Cart