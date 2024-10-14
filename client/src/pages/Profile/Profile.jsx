import React from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'
import profile_male from '../../assets/images/profile-image-female.png';
import toast, {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { registervalidation,profileValidation } from '../../helper/validate'
import convertToBase64 from '../../helper/convertImage';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useUserProfile from '../../hooks/getProfile';
import { useEffect } from 'react';
import axios from "axios";

function Profile() {
    
    const {token,username,logout} = useAuth();
    const {profile,error,loading,profileImage} = useUserProfile();
    const [file,setFile] = useState(profileImage);
    useEffect(() => {
        if (token) {
          axios.get(`https://propertybazzar-server.onrender.com/user/${username}`) 
                    .then(response => {
                        if(response.data.profile===" "){
                            setFile(mailAvatar)
                            
                        }
                        else{setFile(response.data.profile)}
                        
                    })
                    .catch(error => {
                        console.error('Error fetching profile picture:', error);
                    });
        } else {
          
          setFile(mailAvatar);
        }
      }, [token]);
      const onSubmit = async(value) => {
        value = await Object.assign(value, {profile : file || ''});
        try {
            const response = await axios.put(`https://propertybazzar-server.onrender.com/updateuser/${username}`, value);
            
            if (response.status === 200) {
                
                toast.success("Congrats, Profile Successfully Updated!");
                window.location.href = '/profile';
            } 
            else
            {
                toast.error("Something went wrong !");
            }
        } catch (err) {
            if (err.response && err.response.status === 400) {
                toast.error(`Error: ${err.response.data.error  || "Please use  a unique username!"}`);
            }
            else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
            

    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName : profile?.fullName  || '',
            mobile : profile?.mobile || '',
            address : profile?.address || '',
            email: profile?.email || '',
            username: profile?.username || '',
        },
        validate : profileValidation,
        validateOnBlur:false,
        validateOnChange : false,
        onSubmit
    })

    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64)
    };
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;

  return (
    <>
    <div className=' bg-white'>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}>

        </Toaster>
        <div className='flex justify-center md:justify-around items-center h-screen'>
            <div className='glass h-[90%] md:h-[80%]'>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-2xl md:text-3xl font-bold'>Profile!</h4>
                    <span className='py-2 text-sm md:text-lg w-2/3 text-center text-gray'>You can update the details.</span>
                </div>
                <form className='' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-1 md:py-2'>
                    <label htmlFor='profile'>
                        <img src={file || profile_male} alt='avtar' className='profile_img' />
                        </label>
                        <input onChange={onUpload} type='file' id='profile' name='profile' />
                    </div>
                    <div className='textbox mx-auto mt-16 md:mt-6 flex flex-col items-center gap-4 md:gap-6'>
                        <div className="name flex w-3/4 gap-10">
                            <input {...formik.getFieldProps('fullName')} type='text' className='textbox border  border-honeyDraw' placeholder='Full Name' />
                            <input {...formik.getFieldProps('username')} type='text' className='textbox border  border-honeyDraw' disabled="disabled" placeholder='Username' />
                        </div>
                        <div className="name flex w-3/4 gap-10">
                            <input {...formik.getFieldProps('mobile')} type='text' className='textbox border border-honeyDraw' placeholder='Mobile No.' />
                            <input {...formik.getFieldProps('email')} type='text' className='textbox border border-honeyDraw' placeholder='Email' />
                        </div>
                        
                            <input {...formik.getFieldProps('address')} type='text' className='textbox border w-3/4 py-2 border-honeyDraw' placeholder='Address' />
                            <button type='submit' className='border bg-orange text-white  w-3/4 py-2 rounded-lg text-xl shadow-sm text-center  hover:bg-sky'>Update</button>
                    </div>
                    <div className='text-center'>
                        <span className='text-gray text-sm'>come back later? <button className='text-orange hover:underline hover:text-orange' onClick={logout}>Logout</button></span>
                    </div>
                </form>
            </div>
        </div>

    </div>
    </div>
    </>
  )
}

export default Profile