import React from 'react'
import {NavLink} from 'react-router-dom'
import './NavBar.css'
import LoginButton from '../Logging/LoginButton'
import LogoutButton from '../Logging/LogoutButton'


const NavBar = () => {

  return (
    
    <div className='nav'>
      <LoginButton   />
      <LogoutButton />
    <NavLink to='/' className={`${'nav-links'} ${'nav-part'}`}>Home</NavLink>
    <NavLink to='/cart' className={`${'nav-links'} ${'nav-part'}`}>Cart</NavLink>
    
      
    </div>
    
  
   
  )
}

export default NavBar