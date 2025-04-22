import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../../Context/AuthContext';
import  { Order } from '../../types/type';
import '../../pages/Product Edit/ProductEdit.css'


const DisplayOrders = () => 
{
    const [orders, setOrders] = useState<Order[]>([]);
    const [showDetails,setShowDetails] = useState<Record<string,boolean>>({}) 
    const { globalUserId } = useAuth();
   
    const toggleDetails=(orderId:string)=>{
        setShowDetails(prev=>({...prev,[orderId]:!prev[orderId]}))

    }
    

    useEffect(() => {
        
        const fetchData = async() => {
            const querySnapshot = await getDocs(collection(db,'orders'));
            const dataArray = 
            querySnapshot.docs.map((doc) => ({
                id:doc.id,
                date:doc.data().date,
                products:doc.data().products,
                totalPrice:doc.data().totalPrice,
                userId:doc.data().userId,
                userName: doc.data().userName,
            })) as Order[];
            setOrders(dataArray);
           
        };
        
        fetchData();
    }, []);
    console.log("globalUserId:", globalUserId);
console.log("orders:", orders);

    return (
        <div>
            
            <h2>Order List</h2>
            <h4>Click on order to see details</h4>
            {
                orders.map
                (
                    (order) => order.userId===globalUserId&&
                    (
                
                        <div key={order.date}>
                            <p>Date: {new Date(order.date).toLocaleDateString('en-US',
                                {weekday:'long',
                                year:'numeric',
                                month:'long',
                                day:'numeric'})}</p>
                                <div >
                                    <button 
                                        className='button'
                                        onClick={()=>toggleDetails(order?.id)}>
                                            {showDetails[order.id]?'Hide Details':'Show Details'}</button>
                                    {showDetails[order.id]&&(
                                        <>
                                    <ul>
                                    {
                                        order.products.map(
                                                (product, index)=>
                                                    (
                                                        <li key={index}>
                                                        <b>Product:</b> {product.title} <br></br>
                                                        <b>Price:</b> {product.price} <br></br>
                                                        <b>Quantity:</b> {product.quantity}
                                                        </li>
                                                    )
                                                )
                                    }
                                   
                                    </ul>
                                    
                                    <p><b>Total Price: </b>{order.totalPrice}</p>
                                    </>
                                    )}
                                    <hr></hr>
                                </div>
                                
                        </div>
                    )
                )
            
            }
                   
        </div>
    )
}
export default DisplayOrders