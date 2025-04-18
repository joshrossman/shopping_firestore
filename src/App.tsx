import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Profile from "./pages/Profile"
import { ProductProvider } from "./Context/ProductContext"
import {QueryClient, QueryClientProvider } from 'react-query'
import Cart from "./pages/Cart/Cart"
import Auth0ProviderWithNavigate from "./components/Logging/AuthProvider"
import Callback from "./components/Logging/Callback"
import { CartProvider } from "./Context/CartContext"
import { AuthProvider } from "./Context/AuthContext"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import NavBar from "./components/NavBar/NavBar"
import AddDataForm from "./pages/AddDataForm"
import DisplayData from "./pages/DisplayData"

function App() {
  const queryClient = new QueryClient();

  return (
    
    <QueryClientProvider client={queryClient}>
     <ProductProvider>
     <CartProvider>
      <AuthProvider>  
       
      <BrowserRouter>  
      <NavBar />   
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/add' element={<AddDataForm />} />
            <Route path='/display' element={<DisplayData />} />
          </Routes>  
      
      </BrowserRouter>


        </AuthProvider>
    
    </CartProvider>
    </ProductProvider>
    </QueryClientProvider>


   

  )
}

export default App
