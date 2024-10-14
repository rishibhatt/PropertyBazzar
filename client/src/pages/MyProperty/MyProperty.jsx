import React, { useEffect, useState } from 'react'
import ImageCarousel from '../../components/Property List/ImageCarousel';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './MyProperty.css'
import Loader from '../../components/Loader/Loader';

const MyProperty = () => {
    const [property, setProperty] = useState([]);
    const [propertyLength, setPropertyLength] = useState(0);
    const [featureOptions,setFeatureOptions] = useState([
        { value: 'Balcony', label: 'Balcony' },
        { value: 'Gym', label: 'Gym' },
        { value: 'Pool', label: 'Pool' },
        { value: '24/7 Security', label: '24/7 Security' }
    ]);
   
    const {id} = useAuth();
    const animatedComponents = makeAnimated();
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedCheck, setSelectedCheck] = useState('');
    const [loading,setLoading] = useState(true)

  const handleCheckChange = (e) => {
    setSelectedCheck(e.target.value);
  };

    useEffect(() => {
        if(id){
            axios.get(`https://propertybazzar-server.onrender.com/getUserProperty/${id}`)
            .then(response => {
                
                setProperty(response.data);
                
                setPropertyLength(response.data.length)
                const transformedOptions = response.data.map(feature => ({
                    id:feature._id,
                    value: feature.features, 
                    label: feature.features}));
                  
                  setSelectedOption(transformedOptions);
                const transformedChecks = response.data.map(check => (
                    check.propertyCategory
                ))
                setSelectedCheck(transformedChecks)
               
            })
            .catch(error => {
                console.error('Error fetching :', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after data is fetched
            });;
        }
    
}, [id]);


const handleDropdownChange = (selectedOption) => {
    setSelectedOption(selectedOption)
}

  return (
    <>
    <div className='p-10 flex flex-col gap-20'>
    <Link className='add-btn p-2 border w-40' to="/addhouse">Add House</Link>
    { loading ? (<Loader />) : ( propertyLength > 0  ? 
        property.map((property) => (
        <form key={property._id} className='property-container border  h-full w-3/4 mx-auto flex'>
        <div className='img  border  h-80 w-1/2 relative ml-3 mt-5'>
         <ImageCarousel property={property} />
         <h3 className='text-center text-lg p-2 mt-10'>{property.title}</h3>
         <h3 className='text-center text-2xl p-2'>Price : ₹{property.price?.amount}</h3>
        </div>
        <div className='p-5 w-full  flex flex-col gap-3'>
            <div className='flex flex-col md:flex-row'>
            <label className='p-2'>Title: </label>
            <input  className='border w-1/2 min-[940px]:w-full p-2' value={property.title} readOnly  />
            </div>
            <div className='flex flex-col md:flex-row'>
                <label className='p-2'>Description: </label>
            <input  className='border w-[40%] min-[940px]:w-full p-2' value={property.description} readOnly />
            </div>
            <div className='flex min-[940px]:flex-row flex-col gap-2 md:w-full w-[70%] justify-between'> 
            <div className='flex md:flex-row flex-col'>
            <label className='p-2'>Name: </label>
            <input  className='border text-center w-20 md:w-36 p-2' value={property.contactInfo.name} readOnly />
            </div>
            <div className='flex md:flex-row flex-col'>
            <label className='p-2'>Email: </label>
            <input  className='border text-center w-20 md:w-56 p-2 ' value={property.contactInfo.email} readOnly />
            </div>
            </div>
            <div className='flex w-full flex-col md:flex-row'>
            <label className='p-2'>Phone: </label>
            <input  className='border w-1/2 min-[940px]:w-full p-2' value={property.contactInfo.phone} readOnly />
            </div>
            
            <div className='flex w-[70%] md:w-full justify-between'>
                <div>
                    <label className='p-2'>Bedrooms: </label>
                    <input  className='border text-center w-12 p-2 =' value={property.details.bedrooms} readOnly />
                </div>
                <div>
                    <label className='p-2'>Bathrooms: </label>
                    <input  className='border text-center w-12 p-2 ' value={property.details.bathrooms} readOnly />
                 </div>
                <div>
                    <label className='p-2'>Sq.Ft: </label>
                    <input  className='border text-center w-20 p-2 ' value={property.details.squareFootage} readOnly />
                </div>
             </div>
            <div className='flex w-full justify-between'>
                <div>
                    <label className='p-2'>Lot Size: </label>
                    <input  className='border text-center w-12 p-2' value={property.details.lotSize} readOnly />
                </div>
                <div>
                    <label className='p-2'>Year Built: </label>
                    <input  className='border text-center w-20 p-2 ' value={property.details.yearBuilt} readOnly />
                </div>
                <div className='w-28'>
                    
                </div>
            </div>
            <div className='flex w-[70%] min-[840px]:w-full justify-between'>
                <div>
                    <label className='p-2'>Street: </label>
                    <input  className='border text-center w-20 min-[940px]:w-44 p-2 ' value={property.location.address} readOnly />
                </div>
                <div>
                    <label className='p-2'>City: </label>
                    <input  className='border text-center w-20 min-[940px]:w-36 p-2 ' value={property.location.city} readOnly />
                </div>
                <div>
                    <label className='p-2'>State: </label>
                    <input  className='border text-center w-16 min-[940px]:w-24 p-2 ' value={property.location.state} readOnly />
                </div>
            </div>
            <div className='flex w-full  justify-between'>
                <div>
                    <label className='p-2'>Country: </label>
                    <input  className='border text-center w-36 min-[740px]:w-24 p-2 ' value={property.location.country} readOnly />
                </div>
                <div>
                    <label className='p-2'>Postal Code: </label>
                    <input  className='border text-center w-36 min-[740px]:w-24 p-2 ' value={property.location.zipCode} readOnly />
                </div>
                <div className='w-28'></div>
            </div>

            <div className='flex justify-between w-[70%] md:w-full'>
                <label>Features:</label>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={featureOptions}
                    className='w-[85%]'
                    value={property.features.map(feature => ({
                        value: feature,
                        label: feature
                    }))}
                    onChange={handleDropdownChange}
                    isDisabled={true}
                />
            </div>
            
            
        <div className='w-[70%] md:w-full'>
      
      <ul className="items-center w-full text-sm font-medium text-gray bg-white border border-gray rounded-lg sm:flex max-[768px]:flex-col">
        <li className="w-full border-b border-gray md:border-b-0 md:border-r ">
          <div className="flex items-center ps-3">
            <input
              id="horizontal-list-radio-license"
              type="radio"
              value="Residential"
              name="list-radio"
              checked={property.propertyCategory === "Residential"}
              onChange={handleCheckChange}
              className="w-4 h-4 text-sky bg-gray border-gray readonly"
            />
            <label className='w-full py-3 ms-2 text-sm font-medium'>
            Residential
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray md:border-b-0 md:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="horizontal-list-radio-id"
              type="radio"
              value="Property"
              name="list-radio"
              checked={property.propertyCategory === "Property"}
              onChange={handleCheckChange}
              className="w-4 h-4 text-sky bg-gray border-gray "            />
            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Property
            </label>
          </div>
        </li>
        <li className="w-full border-b border-gray md:border-b-0 md:border-r dark:border-gray-600">
          <div className="flex items-center ps-3">
            <input
              id="horizontal-list-radio-military"
              type="radio"
              value="Vacant Land"
              name="list-radio"
              checked={property.propertyCategory === "Vacant Land"}
              onChange={handleCheckChange}
              className="w-4 h-4 text-sky bg-gray border-gray "
              />
            <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Vacant Land
            </label>
          </div>
        </li>
        
      </ul>
    </div>
        </div>

        </form>
    )):<div>No properties Available</div>)}
    </div>
    </>
  )
}

export default MyProperty

