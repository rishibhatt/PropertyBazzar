import React from 'react'
import { Link } from 'react-router-dom'
import './Recovery.css'
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../../helper/validate'

function Recovery() {
    const formik = useFormik({
        initialValues: {
            username : '',
            password : ''
        },
        validate : usernameValidate,
        validateOnBlur:false,
        validateOnChange : false,
        onSubmit : async value => {
            
        }
    })
  return (
    <>
    <div className=' bg-white'>
    <div className='container'>
        <Toaster position='top-center' reverseOrder={false}>

        </Toaster>
        <div className='flex justify-center items-center h-screen w-full'>
            <div className='glass'>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-2xl md:text-3xl font-bold'>Recovery!</h4>
                    <span className='py-4 text-sm md:text-lg w-2/3 text-center text-gray'>Enter OTP to recover password.</span>
                </div>
                <form className='pt-10' onSubmit={formik.handleSubmit}>
                
                    <div className='textbox  mt-4 flex flex-col items-center gap-6'>
                      
                        <span className='py-4 text-sm text-left text-gray'>
                            Enter 6 digit OTP sent to your email address.
                        </span>
                        <input type='text' className='textbox border border-darkBlack' placeholder='OTP' />
                        
                        <button type='submit' className='border bg-orange text-white hover:bg-sky w-1/2 py-2 rounded-lg text-xl shadow-sm text-center'>Verify OTP !</button>
                    </div>
                    <div className='text-center py-4'>
                        <span className='text-gray text-sm'>Can't get OTP? <button className='text-sky underline hover:text-orange'>Resend OTP</button></span>
                    </div>
                </form>
            </div>
        </div>

    </div>
    </div>
    </>
  )
}

export default Recovery