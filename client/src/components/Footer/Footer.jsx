import React from 'react'
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
      <>
          <div className='footer-container bg-cream p-5 '>
              <div className='flex flex-row justify-around '>
                  <div className='flex flex-col'>
                      <img src={logo} className='h-32 w-32 md:h-40 md:w-40' />
                      <p className='text-xs'>Call us on +91 9876543201</p>
                      <div className='p-1 flex justify-around md:gap-4 text-2xl md:text-3xl'>
                          <FontAwesomeIcon icon={faFacebook} />
                          <FontAwesomeIcon icon={faXTwitter} />
                          <FontAwesomeIcon icon={faLinkedin} />
                          <FontAwesomeIcon icon={faInstagram} />
                      </div>
                  </div>
                  
                  <div className='flex flex-col p-4 mt-3 md:mt-0 md:pt-7 gap-2 text-center text-xl'>
                      <h3 className='underline font-extrabold decoration-orange'>Services</h3>
                      <div className='p-1 flex flex-col gap-2 md:gap-4 text-xs md:text-sm'>
                          <b>Property Buying</b>
                          <b>List your property</b>
                          <b>Rentals</b>
                      </div>

                  </div>
                  <div className='flex flex-col mt-3 md:mt-0 p-3 md:pt-7 gap-2 text-center text-xl'>
                      <h3 className='underline font-extrabold decoration-orange'>Company</h3>
                      <div className='p-1  flex flex-col gap-2 md:gap-4 text-xs md:text-sm'>
                          <b>About us</b>
                          <b>Blogs</b>
                          <b>Contact us</b>
                      </div>

                  </div>
                  <div className='flex flex-col mt-3 md:mt-0 p-3 md:pt-7 gap-2 text-center text-xl'>
                      <h3 className='underline font-extrabold decoration-orange'>Support</h3>
                      <div className='p-1 flex flex-col gap-2 md:gap-4 text-xs md:text-sm'>
                          <b>FAQ</b>
                          <b>Staff</b>
                          <b>Board</b>
                      </div>
                  </div>
              </div>
              <p className='text-xs underline  right-4 '>Made with ❤️ by Rishieee </p>

          </div>
          
      </>
  )
}

export default Footer