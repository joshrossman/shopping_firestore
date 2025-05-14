
import { render} from '@testing-library/react'
import { CartProvider } from "../Context/CartContext";
import CartCard from '../components/ProductCard/ProductCard';
import { Product } from '../types/type';
import "@testing-library/jest-dom"

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


//  <h3 className='product-title'>Title:{product.title}</h3>
         expect(getByText(`${mockProduct.title}`)).toBeInTheDocument()
        });
       
    });
      
    

    
    



