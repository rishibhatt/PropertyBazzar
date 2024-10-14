import React, { useEffect, useState } from 'react'
import './PropertyList.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocation } from '@fortawesome/free-solid-svg-icons';
import ImageCarousel from './ImageCarousel';
import loading_properties from '../../assets/gif/loading_properties.gif'
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';

function PropertyList() {
    
    const [property, setProperty] = useState([]);
    const [visibleContactId, setVisibleContactId] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [recordsPerPage] = useState(3)
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = property.slice(indexOfFirstRecord, indexOfLastRecord);

    useEffect(() => {
        
            axios.get(`https://propertybazzar-server.onrender.com/getProperties`)
                .then(response => {
                    
                    setProperty(response.data);
                })
                .catch(error => {
                    console.error('Error fetching :', error);
                });
        
    }, [property]);
    const toggleVisibility =(propertyId) => {
        if (visibleContactId.includes(propertyId)) {
            setVisibleContactId(visibleContactId.filter((id) => id !== propertyId));
          } else {
            setVisibleContactId([...visibleContactId, propertyId]);
          }
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (

        <>
        <div className='text-center mt-5 p-5 pb-2 text-2xl text-gray '>Recently Added Properties !</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 p-3 mb-5" style={{ gridAutoRows: '1fr' }}>
      {currentRecords.length >0  ? (
        currentRecords.map((property) => (
          <div 
            key={property._id} 
            className="w-[400px]  mx-auto bg-white shadow-lg rounded-lg  my-4 md:w-96 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110"
            style={{ alignSelf: 'start' }}  // Fixed height for all cards
          >
            {/* Image */}
            <div className='h-48 bg-gray-200 flex items-center justify-center '><ImageCarousel property = {property} /></div>
            

            {/* Content */}
            <div className="p-4 flex flex-col justify-between h-full">
              <div className='h-auto flex flex-col'>
                {/* Title */}
                <h3 className="text-sm font-black text-gray-900 mb-2 flex justify-between">
                  {property.title} 
                </h3>
                
                {/* Location */}
                <div className="text-sm text-gray">
                <FontAwesomeIcon className='text-gray mr-1 text-md' icon={faLocation} />{property?.location?.address}, {property?.location?.city}, {property.location?.state} {property.location?.zipCode}, {property.location?.country}
                </div>
             {/* Features*/}
             <div className='featureTags mt-2 items-center-center flex flex-wrap justify-start gap-1 h-20'>
                {property.features.map(
                    (feature,id) => (
                        <div key={id} className='border text-sm bg-honeyDraw text-darkGreen p-1 text-center px-4 rounded-full h-8 '>
                            {feature}
                        </div>
                    )
                )}
                <span className='border text-sm bg-orange text-whiteSmoke p-1 text-center px-4 rounded-full h-8'>{property.propertyCategory}</span>
             </div>
             {/* Rooms Details */}

                
              {/* Price */}
              <div className="text-lg font-bold p-2 mt-4 px-3  rounded-xl flex justify-between ">
                  <span className='rounded-xl h-10 pt-1 p-2 text-center bg-lightGreen'>₹ {property.price.amount.toLocaleString()}</span>
                  <button onClick={() => toggleVisibility(property._id)} className={`text-right rounded-full border h-10 p-1 px-3 text-lg ${visibleContactId.includes(property._id)? 'text-darkGreen' : 'text-orange'}`}><FontAwesomeIcon icon={faPhone} /></button>
                </div>
                
                {/* Contact Info Button*/}
                
              {/* Contact Information */}
              {visibleContactId.includes(property._id) && (
                <div  className={`flex flex-row justify-between p-2 transform transition-all duration-500 ease-in-out overflow-hidden ${
                    visibleContactId.includes(property._id)
                      ? 'opacity-100 max-h-40'
                      : 'opacity-0 max-h-0'
                  }`}>
               
                <p className="text-darkBlack text-sm mt-3">
                  <strong>Owner :</strong> {property?.contactInfo?.name}
                </p>
                <p className="ttext-darkBlack text-sm mt-3">
                  <strong>Phone:</strong> {property?.contactInfo?.phone}
                </p>
              </div>
              )}
              
              </div>
            </div>
            
          </div>
          
        ))
        
      ):<div className='w-full  md:ml-96'> <Loader /></div>}
    </div>
    {/* Pagination */}
    { property.length>0 && <Pagination
                recordsPerPage={recordsPerPage}
                totalRecords={property.length}
                paginate={paginate}
                currentPage={currentPage}
            /> }
    
        </>
    )
}

export default PropertyList