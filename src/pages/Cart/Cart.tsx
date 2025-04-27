import React, {useState } from 'react'
import { useCartContext } from '../../Context/CartContext'
import { Order  } from '../../types/type';
import { useAuth } from '../../Context/AuthContext';

import { db } from '../../lib/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';


import CartCard from '../../components/CartCard/CartCard';
import './cart.css'


const Cart = () => {
const {dispatch,cart, cartTotal, cartItemTotal} = useCartContext();
const { globalUserId, globalUserName } = useAuth();

  const [_data, setData] = useState<Omit<Order,'id'>>({
    date:'',
    products:[],
    totalPrice:0,
    userId:'',
    userName:'',
    });

    const checkOut = async() => {
      const today = new Date().toISOString();
   
    

      try{
       
        await addDoc(collection(db,'orders'),{
          date:today,
          products:cart,
          totalPrice:cartTotal,
          userId: globalUserId,
          userName:globalUserName,

        });
        dispatch({type:"CHECKOUT",payload:cart})
        setData({
          date:'',
          products:[],
          totalPrice:0,
          userId:'',
          userName:'',
           
        });
    } catch (error) {
        console.error('Error adding document', error);
    }

      
    }
    
  return (
    <>
    
   
    <div className='div-cart'>Cart Total: ${cartTotal}<br></br>
    Number of Items in Cart: {cartItemTotal}<br></br>
    <button className='check-out' onClick={()=>{checkOut()}}>Checkout</button>
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