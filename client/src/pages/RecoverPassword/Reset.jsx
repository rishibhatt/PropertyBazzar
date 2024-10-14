import React from 'react'
import { Link } from 'react-router-dom'
import './Reset.css'
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../../helper/validate'

function Reset() {
    const formik = useFormik({
        initialValues: {
            password : '',
            confirmpassword : ''
        },
        validate : resetPasswordValidation,
        validateOnBlur:false,
        validateOnChange : false,
        onSubmit : async value => {
            console.log(value)
        }
    })
  return (
    <>
    <div className=' bg-white'>
    <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}>

        </Toaster>
        <div className='flex justify-center md:justify-around items-center h-screen'>
            
            <div className='glass'>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-2xl md:text-3xl font-bold'>Reset!</h4>
                    <span className='py-4 text-sm md:text-lg w-2/3 text-center text-gray'>Enter new password.</span>
                </div>
                <form className='py-10' onSubmit={formik.handleSubmit}>
                    
                    <div className='textbox mx-auto mt-4 flex flex-col items-center gap-6'>
                        <input {...formik.getFieldProps('password')} type='text' className='textbox border border-honeyDraw' placeholder='New Password' />
                        <input {...formik.getFieldProps('confirmpassword')} type='text' className='textbox -mt-3 border border-honeyDraw' placeholder='Repear Password' />
                        <button type='submit' className='border bg-orange text-white hover:bg-sky w-3/4 py-2 rounded-lg text-xl shadow-sm text-center'>Reset</button>
                    </div>
                    
                </form>
            </div>
        </div>

    </div>
    </div>
    </>
  )
}

export default Reset