import  {createContext, useContext, ReactNode, useReducer} from 'react';
import { Product } from '../types/type';


//Define action types
type ProductAction =
| {type:"SET_PRODUCTS"; payload: Product[]}
| {type:"SET_SELECTED_CATEGORY"; payload: string}
| {type:"ADD_PRODUCT"; payload: Product}
| {type:"REMOVE_PRODUCT"; payload: Product}
| {type:"INCREASE_QUANTITY"; payload: Product}
| {type:"DECREASE_QUANTITY"; payload: Product}
| {type:"CHECKOUT";payload:Product[]};

interface ProductState {
    products: Product[];
    selectedCategory: string;
    cart: Product[];
    cartTotal: number;
    cartItemTotal:number;
}

//initial state
const initialState: ProductState = {
    products: [],
    selectedCategory: '',
    cart: [],
    cartTotal: 0,
    cartItemTotal:0,
}

//Reducer function

const productReducer = (
    state: ProductState,
    action: ProductAction
): ProductState => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {...state, products:action.payload};
        case 'SET_SELECTED_CATEGORY':
            return {...state, selectedCategory: action.payload};
        case 'ADD_PRODUCT':
            const isInCart = state.cart.findIndex((product)=>product.title===action.payload.title)
            if(isInCart===-1)
                {
                if((action.payload.quantity!>0)||action.payload.quantity===undefined)
                    action.payload.quantity=1;
                sessionStorage.setItem('cart',JSON.stringify({
                    ...state,cart:[...state.cart,action.payload],
                    cartTotal:Math.round((state.cartTotal+action.payload.price)*100)/100,
                    cartItemTotal:state.cartItemTotal+1,
                }))
                return {
                    ...state,cart:[...state.cart,action.payload],
                    cartTotal:Math.round((state.cartTotal+action.payload.price)*100)/100,
                    cartItemTotal:state.cartItemTotal+1,
       
                };
                
                }
            else
                return {...state,cart:[...state.cart]}
        case 'REMOVE_PRODUCT':
            if(action.payload.quantity!=undefined)
                return {
                    ...state,cart:state.cart.filter((product)=>product.title!==action.payload.title),
                    cartTotal:Math.round((state.cartTotal-action.payload.price*action.payload.quantity)*100)/100,
                    cartItemTotal:state.cartItemTotal-1*action.payload.quantity,
                };
            else
                return {...state}
        case "INCREASE_QUANTITY":
            const isAlreadyInCart = state.cart.findIndex((product)=>product.title===action.payload.title)
            if(isAlreadyInCart!==-1)
                {
                    if((action.payload.quantity===0)||action.payload.quantity===undefined)
                    {
                        action.payload.quantity=1;
                        return {...state}
                    }
                    else
                    {
                        const newQuantity = 
                        {
                            id:action.payload.id,
                            title: action.payload.title,
                            price: action.payload.price,
                            description: action.payload.description,
                            category: action.payload.category,
                            image:action.payload.image,
                            rating:
                            {
                                rate:action.payload.rating.rate,
                                count:action.payload.rating.count
                            },
                            quantity:action.payload.quantity+1,
                        }
                        
                        const updatedQuantity = [...state.cart];
                        console.log(action.payload.quantity)
                        updatedQuantity [isAlreadyInCart] = newQuantity;
            
                        return {
                            ...state,
                            cart:updatedQuantity,
                            cartTotal:Math.round((state.cartTotal+action.payload.price)*100)/100,
                            cartItemTotal:state.cartItemTotal+1,
                            
                                };
                        
                    }
            
                }
            else
                return {...state,cart:[...state.cart]}
            
                
        case "DECREASE_QUANTITY":
            const toRemove = state.cart.findIndex((product)=>product.title===action.payload.title)
            if(toRemove!==-1)
                {
                    if((action.payload.quantity===1)||action.payload.quantity===undefined)
                    {
                        action.payload.quantity=1;
                        alert('At least one item required. If you no longer want this item, please remove it from your cart.')
                        return {...state}
                    }
                    else
                    {
                        const newQuantity = 
                        {
                            id:action.payload.id,
                            title: action.payload.title,
                            price: action.payload.price,
                            description: action.payload.description,
                            category: action.payload.category,
                            image:action.payload.image,
                            rating:
                            {
                                rate:action.payload.rating.rate,
                                count:action.payload.rating.count
                            },
                            quantity:action.payload.quantity-1,
                        }
                        
                        const updatedQuantity = [...state.cart];
                        console.log(action.payload.quantity)
                        updatedQuantity [toRemove] = newQuantity;
            
                        return {
                            ...state,
                            cart:updatedQuantity,
                            cartTotal:Math.round((state.cartTotal-action.payload.price)*100)/100,
                            cartItemTotal:state.cartItemTotal-1,
                            
                                };
                        
                    }
            
                }
            else
                return {...state,cart:[...state.cart]}
        case "CHECKOUT":
            if(state.cart.length>0)
            {
                alert('Checkout complete! Your order will be arriving in the next two weeks. Thank you for shopping with us!')
                sessionStorage.setItem('cart',JSON.stringify({
                    ...state,
                    cart: [],
                    cartTotal: 0,
                    cartItemTotal:0,
                }))
                return {
                    ...state,
                    cart: [],
                    cartTotal: 0,
                    cartItemTotal:0,
                    
                        };
            }
            else
            {
                alert('You cart is currently empty. Nothing to check out!')
                return {...state, };
            }

        default:
            throw new Error (`Unhandled action type: ${action.type}`)
    }
}

interface ProductContextType extends ProductState {
    dispatch: React.Dispatch<ProductAction>
}

const ProductContext= createContext<ProductContextType|undefined>(undefined);

//Provider component
interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps>= ({
    children,
}) => {
    const [state, dispatch] = useReducer(productReducer, initialState)

    return (
        <ProductContext.Provider value={{...state, dispatch}}>
            {children}
        </ProductContext.Provider>
    )
};

//custom hook for accessing the context
export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a PorductProvider')
    }

    return context;
}



