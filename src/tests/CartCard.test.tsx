
import { render} from '@testing-library/react'
import { CartProvider } from "../Context/CartContext";
import CartCard from '../components/CartCard/CartCard';
import { Product } from '../types/type';

import "@testing-library/jest-dom"
import { ProductProvider } from '../Context/ProductContext';

//unit test with dynamic data
const mockProduct: Product = 
    {
        id:'',
        title: 'Shirt',
        price: 375.5,
        description: '',
        category: '',
        image: '',
        rating:
        {
            rate:0,
            
        },
        quantity: 2,
    };
    

  describe('CheckData', () => {
    test('Updates', async () => {
     
        const {getByText} = render( 
        <CartProvider>
      
            <CartCard product={mockProduct} />
           
        </CartProvider>)


         expect(getByText(`${mockProduct.title}`)).toBeInTheDocument()
         expect(getByText(`${mockProduct.price}`)).toBeInTheDocument()
        });
       
    });
      
    

    
    



