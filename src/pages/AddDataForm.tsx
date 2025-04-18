import React, {useState} from 'react';
import { db } from  '../lib/firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Product } from '../types/type'

/*
id:number;
    title: string;
    price: number;
    description: string;
    category: string;
    image:string;
    rating:
    {
        rate:number;
        count:number;
    }
    //additional types which will be needed for the cart. It must be optional, since when it is called from the api endpoint, it will not have a quantity.
    quantity?: number;
*/

const AddDataForm = () => {
    const [data, setData] = useState<Omit<Product,'id'>>({
        title:'',
        price: 0,
        description: '',
        category: '',
        image:'',
        rating:
        {
            rate:0,
            count:0,
        },
        quantity:0,
       
    });

    const handleChange = (e:
        React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (name==='price' ||name==='quantity')
                setData({...data,[name]:value===''?'':Number(value)})
            else if(name==='count'||name==='rate')
            {
                setData({...data,rating:{...data.rating,[name]:value===''?'':Number(value)}})
            }
            else{
                setData({...data,[name]:value})
            }
           
        };

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();
        try{
            await addDoc(collection(db,'products'),data);
            alert('Data Added!');
            setData({
                title:'',
                price: 0,
                description: '',
                category: '',
                image:'',
                rating:
                {
                    rate:0,
                    count:0,
                },
                quantity:0,
               
            });
        } catch (error) {
            console.error('Error adding document', error);
        }
    };

    return (
        
           
          
            
        
        <form onSubmit={handleSubmit}>
            <input type='text' name='title' value={String(data.title)}
            onChange={handleChange}
            placeholder="title"/><br></br>
             <input type='number' name='price' value={data.price===0?'':data.price}
            onChange={handleChange}
            placeholder="price"/><br></br>
             <input type='text' name='description' value={String(data.description)}
            onChange={handleChange}
            placeholder="description"/><br></br>
             <input type='text' name='category' value={String(data.category)}
            onChange={handleChange}
            placeholder="category"/><br></br>
             <input type='text' name='image' value={String(data.image)}
            onChange={handleChange}
            placeholder="image"/><br></br>
             <input type='number' name='rate' value={data.rating.rate===0?'':data.rating.rate}
            onChange={handleChange}
            placeholder="rate"/><br></br>
             <input type='number' name='count' value={data.rating.count===0?'':data.rating.count}
            onChange={handleChange}
            placeholder="count"/><br></br>
             <input type='number' name='quantity' value={data.quantity===0?'':data.quantity}
            onChange={handleChange}
            placeholder="quantity"/><br></br>
           
        
      
        <button type='submit'>Add Product</button>
        </form>
    )   
}

export default AddDataForm;