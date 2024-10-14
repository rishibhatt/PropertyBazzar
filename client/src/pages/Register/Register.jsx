import React from 'react'
import { Link } from 'react-router-dom'
import './Register.css'
import signup from '../../assets/gif/Signup.gif';
import Robot from '../../assets/gif/registerFace.gif';
import {Toaster,toast} from 'react-hot-toast';
import { useFormik } from 'formik';
import { registervalidation } from '../../helper/validate'
import convertToBase64 from '../../helper/convertImage';
import { useState } from 'react';
import axios from "axios";
function Register() {
    const [file,setFile] = useState();
    const onSubmit = async(value) => {
        value = await Object.assign(value, {profile : file || ''});
        try {
            const response = await axios.post("https://propertybazzar-server.onrender.com/register", value);
    
            if (response.status === 201) {
                toast.success("Congrats, Successfully registered!");
                formik.resetForm();
                setFile();
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
            
        console.log(value)
    }
    
    const formik = useFormik({
        initialValues: {
            email: '',
            fullName : '',
            username : '',
            password : ''
        },
        validate : registervalidation,
        validateOnBlur:false,
        validateOnChange : false,
        onSubmit 
    })

    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64)
    }
  return (
    <>
    <div className=' bg-white'>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}>

        </Toaster>
        <div className='flex justify-center md:justify-around items-center h-screen'>
            <div className='hidden h-3/4 w-1/2  md:block '>
               
                <img src={signup} className='h-full w-full' />
                
                
                
            </div>
            <div className='glass h-[95%] md:h-[90%]'>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-2xl md:text-3xl font-bold'>Register!</h4>
                    <span className='py-2 text-sm md:text-lg w-2/3 text-center text-gray'>Happy to join you.</span>
                </div>
                <form className='' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-1 md:py-2'>
                    <label htmlFor='profile'>
                        <img src={file || Robot} alt='avtar' className='profile_img' />
                        </label>
                        <input onChange={onUpload} type='file' id='profile' name='profile' />
                    </div>
                    <div className='textbox mx-auto mt-2 md:mt-6 flex flex-col items-center gap-4 md:gap-6'>
                        <input {...formik.getFieldProps('fullName')} type='text' className='textbox border border-honeyDraw' placeholder='Full Name' />
                        <input {...formik.getFieldProps('username')} type='text' className='textbox border border-honeyDraw' placeholder='Your Nick Name ' />
                        <input {...formik.getFieldProps('email')} type='text' className='textbox border border-honeyDraw' placeholder='email' />
                        <input {...formik.getFieldProps('password')} type='text' className='textbox  border border-honeyDraw' placeholder='password' />
                        <button type='submit' className='border bg-sky text-white hover:bg-orange w-3/4 py-2 rounded-lg text-xl shadow-sm text-center'>Register</button>
                    </div>
                    <div className='text-center'>
                        <span className='text-gray text-sm'>Already Registered? <Link className='text-sky underline hover:text-orange' to='/login'>Log Now</Link></span>
                    </div>
                </form>
            </div>
        </div>

    </div>
    </div>
    </>
  )
}

export default Register