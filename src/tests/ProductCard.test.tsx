
import { render, fireEvent, waitFor, screen, getByText } from '@testing-library/react'
import { CartProvider } from "../Context/CartContext";
import { Product } from "../types/type";
import ProductCard from '../components/ProductCard/ProductCard';


//unit test with dynamic data
const mockProduct: Product = 
    {
        id:'',
        title: '',
        price: 375.5,
        description: '',
        category: '',
        image: '',
        rating:
        {
            rate:0,
        },
    };
    

  describe('CheckData', () => {
    test('Updates', async () => {
     
        const {getByText} = render( 
        <CartProvider> 
            <ProductCard product={mockProduct} />
        </CartProvider>)

        
        console.log('test')
        expect(getByText(/Price:/i).textContent).toBe(`PRICE: $${mockProduct.price}`)
        });
      
    });







   
    

    
    
   
       

