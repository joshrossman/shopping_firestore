import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile"
import { ProductProvider } from "./Context/ProductContext"
import {QueryClient, QueryClientProvider } from 'react-query'
import Cart from "./pages/Cart/Cart"
import Auth0ProviderWithNavigate from "./components/Logging/AuthProvider"
import Callback from "./components/Logging/Callback"
import { CartProvider } from "./Context/CartContext"

function App() {
  const queryClient = new QueryClient();

  return (
    <Auth0ProviderWithNavigate>  
     
     <ProductProvider>
     <CartProvider>
      <QueryClientProvider client={queryClient}>
       
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/callback' element={<Callback />} />
          </Routes>  
      
    </QueryClientProvider>
    </CartProvider>
    </ProductProvider>
    </Auth0ProviderWithNavigate>

   

  )
}

export default App
