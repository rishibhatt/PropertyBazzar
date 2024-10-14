import React ,{lazy,Suspense,} from 'react'
import Header from '../../components/Header/Header'
import './Home.css';
import heroImage from '../../assets/images/hero-image.jpg';
const PropertyList = React.lazy(() => import ('../../components/Property List/PropertyList')) 


function Home() {
  return (
    <>
      <div className='landing-container'>
        <div className='hero-container md:w-3/4 md:rounded-b-3xl p-5 bg-hero-image bg-cover flex items-center'>
        
          
        </div>
        <div className="marquee p-4 md:p-6 lg:p-8 xl:p-10 mt-10 bg-lightGreen text-white">
          <div className="overflow-hidden w-full">
            <div className="inline-block text-nowrap animate-marquee md:text-lg lg:text-xl xl:text-2xl">
              <span className='font-semibold text-nowrap'>
              <span className="text-darkBlack underline  font-extrabold">Discover Your Dream Home</span>
              <span className=""> with our exclusive listings and expert agents. Find the perfect place to call your own today!</span>
              
              </span>
            </div>
          </div>
        </div>
        <div>
          <React.Suspense fallback={<div className='border'>Loading Components..</div>}>
          <PropertyList />
          </React.Suspense>  
        </div>
      </div>
    </>
  )
}

export default Home