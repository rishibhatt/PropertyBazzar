import React, { useState } from 'react';
import { ErrorMessage, useFormik } from 'formik';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import  { convertImagesToBase64 } from '../../helper/convertImage';

        
// Options for Features Dropdown

const featureOptions = [
  { value: 'Balcony', label: 'Balcony' },
  { value: 'Gym', label: 'Gym' },
  { value: 'Pool', label: 'Pool' },
  { value: '24/7 Security', label: '24/7 Security' }
];
const furnishing = [
  { value: 'Fully Furnished', label: 'Fully Furnished' },
  { value: 'Semi Furnished', label: 'Semi Furnished' },
  { value: 'Non Furnished', label: 'Non Furnished' },
];

// Property Categories
const propertyCategories = [
  { value: 'Residential', label: 'Residential' },
  { value: 'Property', label: 'Property' },
  { value: 'Vacant Land', label: 'Vacant Land' }
];
const propertyStatus = [
  { value: "For Sale", label: "For Sale" },
  { value: "For Rent", label: "For Rent" },
  { value: "Sold", label: "Sold" }
];



const AddHouse = () => {
  const { id } = useAuth();
  const animatedComponents = makeAnimated();
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  // Handle Photo Upload
  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    const base64 = await convertImagesToBase64(files);
    
    setPhotos((prevPhotos) => [...prevPhotos, ...base64]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(previews);
    
  };
// Validation Schema for Formik
const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        contactInfo: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            phone: Yup.string().required('Phone is required'),
        }),
        details: Yup.object({
            bedrooms: Yup.number().positive().integer().required('Number of bedrooms is required'),
            bathrooms: Yup.number().positive().integer().required('Number of bathrooms is required'),
            squareFootage: Yup.number().positive().required('Square footage is required'),
            lotSize: Yup.number().positive().required('Lot size is required'),
            yearBuilt: Yup.number().positive().integer().required('Year built is required'),
        }),
        location: Yup.object({
            address: Yup.string().required('Address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            country: Yup.string().required('Country is required'),
            zipCode: Yup.string().required('Postal code is required'),
        }),
        price: Yup.object({
          amount: Yup.number().positive().integer().required('Amount is required'),
        })
});

// Function to handle form submission


  
  // Formik Initialization
  const formik = useFormik({
    initialValues: {
      propertyType: '',
      title: '',
      location: { address: '', city: '', state: '', country:'',zipCode: '' },
      description: '',
      price:{amount : ''} ,
      details: { bedrooms:'', bathrooms:'', squareFootage:'',lotSize:'',furnishing:'',yearBuilt:'' },
      features: [],
      contactInfo: { name: '', email: '', phone: '' },
      propertyStatus: '',
      propertyCategory: '',
      additionalInfo: ''
    },
    validationSchema:validationSchema,
     onSubmit: async values => {
      
      values = await Object.assign(values, {media : {photos : photos || ''}});
      
      try {
        
        const response = await axios.post(`https://propertybazzar-server.onrender.com/postProperty/${id}`, values);
        
        if (response.status === 201) {
          setPhotos([]);
          setPhotoPreviews([]);
          formik.resetForm();
      } 
    } catch (err) {
        console.log(err)
    }
    },
    
    
  
    
    
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 border-4 border-lightGreen bg-white shadow-md rounded-md w-full max-w-3xl mx-auto space-y-6 mt-10 mb-10">
      <h2 className="text-xl font-semibold text-center">Add Property</h2>

      {/* Property Title */}
      <div className="flex flex-col">
        <label htmlFor="title" className="mb-2">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          className={formik.touched.title && formik.errors.title ? "border p-2 rounded-md border-orange" : "p-2 border rounded-md"}
          
        />
       {formik.touched.title && formik.errors.title ? (
    <div className="text-orange">{formik.errors.title}</div>
  ) : null}
      </div>

      {/* Property Description */}
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-2">Description</label>
        <textarea
          id="description"
          name="description"
          className={formik.touched.description && formik.errors.description ? "border p-2 rounded-md border-orange" : "p-2 border rounded-md"}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        {formik.touched.description && formik.errors.description ? (
    <div className="text-orange">{formik.errors.description}</div>
  ) : null}
      </div>

      {/* Property Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-2">Address</label>
          <input
            id="address"
            name="location.address"
            type="text"
            className="p-2 border rounded-md"
            value={formik.values.location.address}
            onChange={formik.handleChange}
          />
       
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-2">City</label>
          <input
            id="city"
            name="location.city"
            type="text"
            className="p-2 border rounded-md"
            value={formik.values.location.city}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-2">State</label>
          <input
            id="state"
            name="location.state"
            type="text"
            className="p-2 border rounded-md"
            value={formik.values.location.state}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-2">Country</label>
          <input
            id="country"
            name="location.country"
            type="text"
            className="p-2 border rounded-md"
            value={formik.values.location.country}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-2">Zip Code</label>
          <input
            id="zipCode"
            name="location.zipCode"
            type="text"
            className="p-2 border rounded-md"
            value={formik.values.location.zipCode}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      {/* Property Price */}
      <div className="flex flex-col">
        <label htmlFor="price" className="mb-2">Price</label>
        <input
          id="price"
          name="price.amount"
          type="number"
          className="p-2 border rounded-md"
          value={formik.values.price.amount}
          onChange={formik.handleChange}
        />
        
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="bedrooms" className="mb-2">Bedrooms</label>
          <input
            id="bedrooms"
            name="details.bedrooms"
            type="number"
            className="p-2 border rounded-md"
            value={formik.values.details.bedrooms}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="bathrooms" className="mb-2">Bathrooms</label>
          <input
            id="bathrooms"
            name="details.bathrooms"
            type="number"
            className="p-2 border rounded-md"
            value={formik.values.details.bathrooms}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="squareFootage" className="mb-2">Square Footage</label>
          <input
            id="squareFootage"
            name="details.squareFootage"
            type="number"
            className="p-2 border rounded-md"
            value={formik.values.details.squareFootage}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lotSize" className="mb-2">Lot Size</label>
          <input
            id="lotSize"
            name="details.lotSize"
            type="number"
            className="p-2 border rounded-md"
            value={formik.values.details.lotSize}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="yearBuilt" className="mb-2">Year Built</label>
          <input
            id="yearBuilt"
            name="details.yearBuilt"
            type="number"
            className="p-2 border rounded-md"
            value={formik.values.details.yearBuilt}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      {/* Features Select */}
      <div className='flex justify-between w-[70%] md:w-full'>
        <label>Features</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={featureOptions}
          className='w-[85%]'
          value={formik.values.features.map(feature => ({
            value: feature,
            label: feature
          }))}
          onChange={(selected) => formik.setFieldValue('features', selected.map(option => option.value))}
        />
      </div>

      {/* Property Category */}
      <div className='flex justify-between w-[70%] md:w-full'>
      <label>Property Type</label>
      <ul className="items-center w-full text-sm font-medium text-gray bg-white border border-gray rounded-lg sm:flex max-[768px]:flex-col">
        {propertyCategories.map((category) => (
          <li key={category.value} className="w-full border-b border-gray md:border-b-0 md:border-r ">
            <div className="flex items-center ps-3">
              <input
                id={`category-${category.value}`}
                type="radio"
                name="propertyCategory"
                value={category.value}
                checked={formik.values.propertyCategory === category.value}
                onChange={formik.handleChange}
                className="w-4 h-4 text-sky bg-gray border-gray"
              />
              <label htmlFor={`category-${category.value}`} className='w-full py-3 ms-2 text-sm font-medium'>
                {category.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
      </div>
      {/* Property Status */}
      <div className='flex justify-between w-[70%] md:w-full'>
      <label>Property Status</label>
      <ul className="items-center w-full text-sm font-medium text-gray bg-white border border-gray rounded-lg sm:flex max-[768px]:flex-col">
        {propertyStatus.map((status) => (
          <li key={status.value} className="w-full border-b border-gray md:border-b-0 md:border-r ">
            <div className="flex items-center ps-3">
              <input
                id={`category-${status.value}`}
                type="radio"
                name="propertyStatus"
                value={status.value}
                checked={formik.values.propertyStatus === status.value}
                onChange={formik.handleChange}
                className="w-4 h-4 text-sky bg-gray border-gray"
              />
              <label htmlFor={`status-${status.value}`} className='w-full py-3 ms-2 text-sm font-medium'>
                {status.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
      </div>
      {/* Property Furnishing */}
      <div className='flex justify-between w-[70%] md:w-full'>
      <label>Furnishing</label>
      <ul className="items-center w-full text-sm font-medium text-gray bg-white border border-gray rounded-lg sm:flex max-[768px]:flex-col ml-4">
        {furnishing.map((furnishing) => (
          <li key={furnishing.value} className="w-full border-b border-gray md:border-b-0 md:border-r ">
            <div className="flex items-center ps-3">
              <input
                id={`category-${furnishing.value}`}
                type="radio"
                name="details.furnishing"
                value={furnishing.value}
                checked={formik.values.details.furnishing === furnishing.value}
                onChange={formik.handleChange}
                className="w-4 h-4 text-sky bg-gray border-gray"
              />
              <label htmlFor={`status-${furnishing.value}`} className='w-full py-3 ms-2 text-sm font-medium'>
                {furnishing.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
      </div>
      
      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2">Name</label>
          <input
            id="name"
            name="contactInfo.name"
            type="text"
            className="p-2 border rounded-md"
            value={formik.values.contactInfo.name}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2">Email</label>
          <input
            id="email"
            name="contactInfo.email"
            type="email"
            className="p-2 border rounded-md"
            value={formik.values.contactInfo.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2">Phone</label>
          <input
            id="phone"
            name="contactInfo.phone"
            type="text"
            className="p-2 border rounded-md"
            value={formik.values.contactInfo.phone}
            onChange={formik.handleChange}
          />
        </div>
      </div>

      {/* Photo Upload */}
      <div className="flex flex-col">
        <label htmlFor="photos" className="mb-2 bg-orange text-white  border text-center cursor-pointer p-2 rounded-full w-1/2 md:w-1/4 mx-auto">Upload Photos</label>
        
        <input
          id="photos"
          name="media.photos"
          type="file"
          multiple
          onChange={handlePhotoUpload}
          className="p-2 border rounded-md"
          
        />
        
        {photoPreviews.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold">Photo Previews:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photoPreviews.map((preview, index) => (
                <img key={index} src={preview} alt={`preview-${index}`} className="w-full h-auto rounded-md shadow" />
              ))}
              
            </div>
          </div>
        )}
      </div>
      <div className='text-center'>
      <button
        type="submit"
        className="w-full text-center bg-sky hover:bg-orange text-white py-2 md:w-1/3 rounded-md hover:bg-blue-600 "
      >
        Submit Property
      </button>
      </div>
      
    </form>
  );
};

export default AddHouse;
