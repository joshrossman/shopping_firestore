import React from 'react'
import { Product } from "../../types/type"
import "./CartCard.css"
import { useCartContext } from '../../Context/CartContext'

//integeration test - test the add to cart button
// checcking that the cart empties out when I click on it. (does not need to check the rendering of the card component)
// fire.click => wait
//Can check delete button, and then text that cart is empy

//
//


const CartCard:React.FC<{product:Product}> = ({product}) => {
  const { dispatch } = useCartContext();
  const removeFromCart = (product:Product) => {
      dispatch({type:'REMOVE_PRODUCT',payload:product})

  }
  const increase = (product:Product) => {
    dispatch({type:'INCREASE_QUANTITY',payload:product})
  }
  const decrease = (product:Product) => {
    dispatch({type:'DECREASE_QUANTITY',payload:product})
  }
  return (
    <div className='product-card'>
        <h3 className='product-title'>Title:{product.title}</h3>
        <p>
        <img className='product-image' src={product.image} alt={product.title} height={50} width={50} />
        <br></br>PRICE: ${product.price}
        </p>
        <div>
        <button
            onClick={()=>decrease(product)}>-</button>
        <input 
            type='text'
            className='quantity'
            value={product.quantity}
            onChange={() => {}}></input>
        <button
            onClick={()=>increase(product)}>+</button>
        </div>
        <button className='cart-button' value={product.title} onClick={()=>removeFromCart(product)}>Remove</button>
    </div>
  )
}



export default CartCard