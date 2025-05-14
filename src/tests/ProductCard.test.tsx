
import { render } from '@testing-library/react'
import { CartProvider } from "../Context/CartContext";
import { Product } from "../types/type";
import ProductCard from '../components/ProductCard/ProductCard';
import "@testing-library/jest-dom"

//unit test with dynamic data
const mockProduct: Product = 
    {
        id:'',
        title: 'Pants',
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

        expect(getByText(`${mockProduct.title}`)).toBeInTheDocument()
        expect(getByText(`PRICE: $${mockProduct.price}`)).toBeInTheDocument()
    
        });
      
    });

    
    








   
    

    
    
   
       

