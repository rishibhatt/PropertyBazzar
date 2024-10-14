import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
const ImageCarousel = ({property}) => {
    const [imgId,setImgId] = useState(0);
    const [img,setImg] = useState(property.media?.photos[imgId]);
    const nextImage = (e) => {
        e.preventDefault()
        if(property.media?.photos.length > imgId+1){
            setImgId((prev) => prev+1)
            
        }
        else{
            setImgId(0)
        }
        
        setImg(property.media?.photos[imgId])
        
        
    }
    const prevImage = (e) => {
        e.preventDefault()
        if(imgId<1)
        {
            setImgId(property.media?.photos.length-1)
        }
        else
        {
            setImgId((prev) => prev-1)
            
        }
        
        setImg(property.media?.photos[imgId])
        
    }
    return (
        <div className="h-full relative  w-full">
            <span className='absolute top-2 right-4 p-2 bg-white'>{property.propertyStatus}</span>
            <button className='absolute border p-2 top-1/2 px-4 bg-white rounded-full left-0 opacity-40 hover:scale-110 text-sm'  onClick={prevImage} ><FontAwesomeIcon icon={faArrowLeft} /></button>
            <img
                src={property.media?.photos.length ? img : 'https://via.placeholder.com/400'}
                alt="Property"
                className="object-cover h-full w-full"
            />
            <button className='absolute top-1/2 right-0 border p-2 rounded-full px-4 bg-white opacity-40 hover:scale-110 text-sm' onClick={nextImage} ><FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
    )
}

export default ImageCarousel