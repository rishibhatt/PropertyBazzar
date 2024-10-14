import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import login from '../../assets/gif/login.gif';
import Robot from '../../assets/gif/Robot face.gif';
import {Toaster,toast} from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../../helper/validate'
import axios from "axios";

function Login() {
    const navigate= useNavigate();
    const onSubmit = async(value) => {
        value = await Object.assign(value);
        try {
            const response = await axios.post("http://localhost:8000/login", value);
            
    
            if (response.status === 200) {
                toast.success("Successfully Logged In!");
                formik.resetForm();
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('id', response.data.id);
                
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
               
            } 
            else
            {
                toast.error("Something went wrong !");
            }
        } catch (err) {
            console.log(err)
            if (err.response && err.response.status === 400) {
                toast.error(`Error: ${err.response.data.error || "Password doesn't match!"}`);
            } 
            else if (err.response && err.response.status === 404) {
                toast.error(`Error: ${err.response.data.error || "User doesn't match!"}`);
            } 
            else {
                toast.error('An unexpected error occurred. Please try again later.');
            }
        }
            
        
    }
    const formik = useFormik({
        initialValues: {
            username : '',
            password : ''
        },
        validate : usernameValidate,
        validateOnBlur:false,
        validateOnChange : false,
        onSubmit
        
    })
  return (
    <>
    <div className=' bg-white'>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}>

        </Toaster>
        <div className='flex justify-center md:justify-around items-center h-screen'>
            <div className='hidden h-3/4 w-1/2  md:block '>
                <img src={login} className='h-full w-full' />
            </div>
            <div className='glass'>
                <div className='title -mt-5 md:mt-0 flex flex-col items-center'>
                    <h4 className='text-2xl md:text-3xl font-bold'>Login!</h4>
                    <span className='py-2 text-sm md:text-lg w-2/3 text-center text-gray'>Explore More by connecting with us.</span>
                </div>
                <form className='' onSubmit={formik.handleSubmit}>
                    <div className='profile flex justify-center py-1 md:py-2'>
                        
                        <img src={Robot} alt='avtar' className='profile_img' />
                    </div>
                    <div className='textbox mx-auto mt-2 md:mt-6 flex flex-col items-center gap-5 md:gap-6'>
                        <input {...formik.getFieldProps('username')} type='text' className='textbox border border-honeyDraw' placeholder='username' />
                        <input {...formik.getFieldProps('password')} type='text' className='textbox -mt-3 border border-honeyDraw' placeholder='password' />
                        <button type='submit' className='border bg-orange text-white hover:bg-sky w-3/4 py-2 rounded-lg text-xl shadow-sm text-center'>Let's Go !</button>
                    </div>
                    <div className='text-center'>
                        <span className='text-gray text-sm'> <Link className='text-orange  hover:underline' to='/recovery'>Forgot Password</Link></span><br />
                        <span className='text-gray text-sm'>Not a Member? <Link className='text-sky underline hover:text-orange' to='/register'>Register Now</Link></span>
                    </div>
                </form>
            </div>
        </div>

    </div>
    </div>
    </>
  )
}

export default Login