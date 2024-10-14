import React from 'react'
import { useEffect } from 'react';
import {useAuth} from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
export default function ProfileDropdown() {
    const {token,logout,username} = useAuth();
    const handleLogout = (e) => {
        e.stopPropagation(); // Prevents the click event from bubbling up
        logout(); // Execute the logout function
    };

  return (
    <>
    <div className='border rounded-lg bg-white absolute z-50 h-auto py-2 w-36 mr-6 right-4 text-center'>
        <ul className='flex flex-col p-2 text-center mx-0 items-center w-full '>
            <li className='p-2 ml-8   w-full relative'><Link to="/profile">My Profile</Link></li>
            <li className='p-2 ml-8   w-full relative'><Link to="/myproperty">My Properties</Link></li>
            <li className='p-2 ml-8'>{token ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}   
            </li> 
        </ul>
    </div>
    </>
  )
}
