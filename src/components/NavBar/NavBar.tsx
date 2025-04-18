import React from 'react'
import { Link }  from 'react-router-dom'
import './NavBar.css'
import { useAuth } from '../../Context/AuthContext'



const NavBar = () => {
  const {user} = useAuth()
  return (
    
    <div className='nav'>
   
    <Link to='/' className={`${'nav-links'} ${'nav-part'}`}>Home</Link>
    <Link to='/cart' className={`${'nav-links'} ${'nav-part'}`}>Cart</Link>
    {!user?
      (<><Link to='/register' className={`${'nav-links'} ${'nav-part'}`}>Register</Link>
      <Link to='/login' className={`${'nav-links'} ${'nav-part'}`}>Login</Link></>):
      (<><Link to='/profile' className={`${'nav-links'} ${'nav-part'}`}>profile</Link>
      <Link to='/logout' className={`${'nav-links'} ${'nav-part'}`}>Logout</Link></>)
    }
    
    
      
    </div>
    
  
   
  )
}

export default NavBar