import React from 'react'
import { Product } from "../../types/type"
import "./ProductCard.css"
import { useCartContext } from '../../Context/CartContext'
import StarRatings from 'react-star-ratings'

//mocking - dummy data in the test in the product. expect to have h3, etc. 
// unit testing - 2 of those one from product and one from somewhere else
// test the function of cart total -1 should be an error, 0 should say 0, etc. different use cases.



const ProductCard:React.FC<{product:Product}> = ({product}) => {
  const { cart, dispatch } = useCartContext();
  
  const addToCart = (product:Product) => {
    
      dispatch({type:'ADD_PRODUCT',payload:product})

  }
  const isInCart = cart.findIndex((cartProduct)=>cartProduct.title===product.title)
  return (
    <div className='product-card'>
        
        <h3 className='product-title'>{product.title}</h3>
        <h6 className='h6'>PRICE: ${product.price}</h6>
        <p>{product.description}</p>
       
        <img className='product-image' src={product.image} alt={product.title} height={50} width={50} />
        
        {(isInCart<0)?
        <button className='shopping-button' value={product.title} onClick={()=>addToCart(product)}>Add to Shopping Cart</button>
        :
          (<p className='added'>Added To Cart</p>)
        }
        <StarRatings
          rating={product.rating.rate}
          starRatedColor="yellow"
          numberOfStars={5}
          name='rating'
        />
    </div>
  )
}



export default ProductCard