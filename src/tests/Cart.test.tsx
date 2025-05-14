import Cart from "../pages/Cart/Cart";
import { render, fireEvent, waitFor, screen, getByText } from '@testing-library/react'
import { CartProvider } from "../Context/CartContext";
import ProductCard from "../components/ProductCard/ProductCard";
import { Product } from "../types/type";

    
const mockProduct: Product = 
    {
id:'',
title:'',
price:40,
description: '',
category: '',
image:'',
rating:
{
    rate:0,
    count:0,}, 
 quantity: 0
    }

    

  describe('PostForm Component Integration Test', () => {
    test('submits the form data correctly', async () => {
     
        
        //cartTotal
        //cartItemTotal
        // Simulate user input
        
        const {getByText} = render( 
        <CartProvider>
            <Cart />
            <ProductCard product={mockProduct} />
        </CartProvider>)

        
        fireEvent.click(screen.getByText(/Add to Shopping Cart/));
        if(mockProduct.quantity!==undefined)
            expect(getByText(/Cart Total:/i).textContent).toBe(`Cart Total: $${mockProduct.price}`) 
            expect(getByText(/Number of Items in Cart:/i).textContent).toBe('Number of Items in Cart: 1') 
        
        fireEvent.click(screen.getByText(/\+/));
        if(mockProduct.quantity!==undefined)
            expect(getByText(/Cart Total:/i).textContent).toBe(`Cart Total: $80`) 
            expect(getByText(/Number of Items in Cart:/i).textContent).toBe('Number of Items in Cart: 2') 
        
        fireEvent.click(screen.getByText(/\+/));
        if(mockProduct.quantity!==undefined)
            expect(getByText(/Cart Total:/i).textContent).toBe(`Cart Total: $120`) 
            expect(getByText(/Number of Items in Cart:/i).textContent).toBe('Number of Items in Cart: 3') 
            fireEvent.click(screen.getByText(/\-/));

        if(mockProduct.quantity!==undefined)
            expect(getByText(/Cart Total:/i).textContent).toBe(`Cart Total: $80`) 
            expect(getByText(/Number of Items in Cart:/i).textContent).toBe('Number of Items in Cart: 2') 
    
        });
      
    });



