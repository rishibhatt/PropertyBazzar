const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({

  ownerId: String,  
  propertyType: String,
  title: String,
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  description: String,
  price: {
    amount: Number,
    
  },
  details: {
    bedrooms: Number,
    bathrooms: Number,
    squareFootage: Number,
    lotSize: Number,
    yearBuilt: Number,
    furnishing: String,
  },
  features: [String],
  media: {
    photos: [String],
    
  },
  contactInfo: {
    name: String,
    email: String,
    phone: String,
  },
  propertyStatus: String,
  propertyCategory: String,
  additionalInfo: String,
});

module.exports = mongoose.model('Property', propertySchema);

