import React from 'react'
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCross, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Login from '../../pages/Login/Login';
import Robot from '../../assets/gif/Robot face.gif';
import { useEffect,useRef } from 'react';
import {useAuth} from '../../contexts/AuthContext';
import axios from 'axios';
import mailAvatar from '../../assets/images/profile-image-male.png'
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';



function Header() {
    const {token,logout,username} = useAuth();
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [toggleMenu,setToggleMenu] = useState(<FontAwesomeIcon icon={faBars} />);
    const [navMenu,setNavMenu] = useState('hidden');
    const [logButton, setLogButton] = useState('Login');
    const [profile,setProfile] = useState(mailAvatar);
    const [profileDropdown,setProfileDropdown] = useState(false);
    const dropdownRef = useRef(null);
  useEffect(() => {
    if (token) {
      setLogButton('Logout');
      axios.get(`https://propertybazzar-server.onrender.com/user/${username}`) 
                .then(response => {
                    
                    if(response.data.profile===""){
                        setProfile(mailAvatar)
                        
                    }
                    else{setProfile(response.data.profile)}
                    
                })
                .catch(error => {
                    console.error('Error fetching profile picture:', error);
                });
    } else {
      setLogButton('Login');
      setProfile(mailAvatar);
    }
  }, [token]);
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setProfileDropdown(false);
        }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [dropdownRef]);


    const toggleIcon = () => {
        if(!isMenuOpen)
        {
            setIsMenuOpen(true);
            setNavMenu(' ');
            setToggleMenu(<FontAwesomeIcon icon={faXmark} />);
            
        }
        else
        {
            setIsMenuOpen(false);
            setNavMenu('hidden');
            setToggleMenu(<FontAwesomeIcon icon={faBars} />);
        }
    }
    const toggleDropdown= () => {
        if(profileDropdown)
        {
            setProfileDropdown(false)
        }
        else
        {
            setProfileDropdown(true)
        }
    }
    
    return (
        <>
            <div className='nav-container w-full  justify-between items-center flex  shadow-lg'>
                <div className='brand pl-0 ml-0 shrink-0'>
                    <Link to="/"><img src={logo}  className='h-20 w-20 md:h-24 md:w-24' /></Link>
                </div>

                
                <div className="nav-item mr-4 ">

                    <ul className='hidden md:flex items-center'>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {token?<li>
                            <Link to="/addhouse">Add House</Link>
                        </li>:''}
                       
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li className=''>
                        {token ? (
                <button onClick={() => { logout(); setLogButton('Login'); }}>Logout</button>
              ) : (
                <Link to="/login">Login</Link>
              )}                       
                        </li>
                        <li ref={dropdownRef} >
                             {profile && (
                                <button onClick={toggleDropdown}><img src={profile} alt="Profile" className="h-14 w-16  rounded-full" /></button>
                            )} 
                            {profileDropdown && <ProfileDropdown />}
                        </li>
                        
                    </ul>

                </div>
                
               

                
                <div className='menu mr-5 z-30 absolute right-0 md:hidden'>
                    <button onClick={toggleIcon} className='text-2xl'>{toggleMenu}</button>
                </div>
            </div>
            <div className={"mobile-nav-item bg-white z-20 absolute border p-5 top-0 h-auto w-1/3 text-center right-0 md:hidden " + navMenu} >

                    <ul className='flex-col mt-32'>
                        <li>
                            <Link to="/" onClick={toggleIcon} >Home</Link>
                        </li>
                        {token?<li>
                            <Link to="/addhouse" onClick={toggleIcon}>Add House</Link>
                        </li>:''}
                        
                        <li>
                            <Link to="/about" onClick={toggleIcon}>About</Link>
                        </li>
                        <li>
                        {token ? (
                <button onClick={() => { logout(); setLogButton('Login'); }}>Logout</button>
              ) : (
                <Link to="/login" onClick={toggleIcon}>Login</Link>
              )}
                        </li>
                        <li>
                             {profile && (
                                <Link to="/profile">My Profile</Link>
                            )} 
                        </li>
                        <li>
                             {profile && (
                                <Link to="/myproperty">My Properties</Link>
                            )} 
                        </li>
                        <li>
                             {profile && (
                               <button onClick={toggleDropdown}> <img src={profile} alt="Profile" className='h-24 w-24 rounded-full'  /></button>
                            )} 
                        </li>
                    </ul>
                    
                </div>
                

        </>
    )
}

export default Header