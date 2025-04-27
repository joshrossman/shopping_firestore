import  { useState, useEffect } from 'react';
import { db } from '../../lib/firebase/firebase'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Product } from '../../types/type';
import './ProductEdit.css'



const ProductEditAndDisplay = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newTitle, setNewTitle ] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [newPrice, setNewPrice] = useState<number>(0);
    const [newRate, setNewRate] = useState<number>(0);
    const [newCount, setNewCount] = useState<number>(0);
    const [newCategory, setNewCategory] = useState<string>('');
    const [newImage, setNewImage] = useState<string>('');
    const [productUpdate, setUpdate] = useState<boolean>(false)



    const updateProduct = async (productId:string, updatedData:any) => {
        const productDoc = doc(db, 'products', productId);
        await updateDoc(productDoc, updatedData);
        setUpdate(true)
        setNewTitle('')
        setNewDescription('')
        setNewRate(0)
        setNewCount(0)
        setNewPrice(0)
        setNewCategory('')
        setNewTitle('')
        alert('Update was successful!')
    };

    const deleteProduct = async (productId:string)=> {
        await deleteDoc(doc(db,'products',productId))
        alert("Product has been succefully deleted")
        setUpdate(true)
    }

    useEffect(() => {
        const fetchData = async() => {
            const querySnapshot = await getDocs(collection(db,'products'));
            const dataArray = 
            querySnapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            })) as Product[];
            setProducts(dataArray);
            setUpdate(false)
        };

        fetchData();
    }, [productUpdate]);

    return (
        <div>
            <h2> Products List</h2>
            {products.map((product:Product) => (
                <div key={product.id}>
               
       
               <p>Title: {product.title}</p>
                        
                    <input
                    onChange={(e)=>setNewTitle(e.target.value)}
                    type='string'
                    placeholder='Enter New Title:'
                    className='text'
                    />
                    <button className='button' onClick={()=>updateProduct(product.id,{title:newTitle})}>
                        Update Title
                    </button>
                        
                    {/* Update Image */}
                    <p>Image: {product.image}</p>  
                    <input
                    onChange={(e)=>setNewImage(e.target.value)}
                    type='string'
                    placeholder='Enter New Image:'
                    className='text'
                    />
                    <button
                     className='button'
                    onClick={()=>updateProduct(product.id,{image:newImage})}>Update Description</button>
                    
                    {/* Update Description */}
                    <p>Description: {product.description}</p>
                    <input
                    onChange={(e)=>setNewDescription(e.target.value)}
                    type='string'
                    placeholder='Enter New Description:'
                    className='text'
                    /> 
                    <button
                     className='button'
                    onClick={()=>updateProduct(product.id,{description:newDescription})}>Update Description</button>
                        
                    {/* Update Category */}
                    <p>Category: {product.category}</p>
                    <input
                    onChange={(e)=>setNewCategory(e.target.value)}
                    type='string'
                    placeholder='Enter New Category:'
                    className='text'
                    />
                    <button
                     className='button'
                    onClick={()=>updateProduct(product.id,{category:newCategory})}>Update Category</button>
                     
                     {/* Update Price */}
                     <p>Price: {product.price}</p>
                     <input
                    onChange={(e)=>setNewPrice(Number(e.target.value))}
                    type='number'
                    placeholder='Enter New Price:'
                    className='text'
                    />
                    <button 
                     className='button'
                    onClick={()=>updateProduct(product.id,{price:newPrice})}>
                        Update Price
                    </button>

                    {/* Update Rate */}
                        <p>Rate: {product.rating.rate}</p>
                        <input
                    onChange={(e)=>setNewRate(Number(e.target.value))}
                    type='number'
                    placeholder='Enter New Rating:'
                    className='text'
                    />
                    <button 
                     className='button'
                    onClick={()=>updateProduct(product.id,{'rating.rate':newRate})}>
                        Update Rate
                    </button>

                    {/* Update Count */}
                        <p>Count: {product.rating.count}</p>
                        <input
                    onChange={(e)=>setNewCount(Number(e.target.value))}
                    type='number'
                    placeholder='Enter New Count:'
                    className='text'
                    />
                    <button 
                     className='button'
                    onClick={()=>updateProduct(product.id,{'rating.count':newCount})}>
                        Update Count
                    </button>
                    
                    <br></br><br></br>
                     <button 
                     className='button deleter'
                     
                     onClick={()=>deleteProduct(product.id)}>Delete Product</button> 
                     <hr></hr>
             </div>   
            ))}
        </div>
    )
}
export default ProductEditAndDisplay