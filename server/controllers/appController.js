const UserModel = require("../models/User.model");
const PropertyModel = require("../models/propertySchema");
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');
const { reset } = require("nodemon");
const JWT_SECRET = "wszB1L66Y2YxtshphGgSUi+l6iKmb3o8pzMEB2tzZ2E="

//POST

/* 
{
  "username" : "example123",
  "password" : "admin123",
  "email" : "example@gmail.com",
  "profile" : ""
}
*/
// Middeleware for verify user
async function verifyUser(req,res,next){
    try{
        const { id } = req.method == "GET" ? req.query : req.body ;
        //check user existance
        let exist = await UserModel.findById({id});
        if(!exist) return res.status(404).send({error: "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({error : "Authentication Error"})
    }
}

async function register(req, res) {
    try {
        const { username, password, profile, email,fullName } = req.body;

        // Check if the username already exists
        const existUsername = await UserModel.findOne({ username });
        if (existUsername) {
            return res.status(400).send({ error: "Please use  a unique username" });
        }

        // Check if the email already exists
        const existEmail = await UserModel.findOne({ email });
        if (existEmail) {
            return res.status(401).send({ error: "Please use a unique email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email,
            fullName
        });

        // Save the user
        await user.save();

        return res.status(201).send({ msg: "User Registered Successfully!" });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

async function login(req,res)
{
    const { username, password } = req.body;
    try{
        UserModel.findOne({ username}).then(
            user => {
                bcrypt.compare(password, user.password)
                    .then( passwordCheck => {
                        if(!passwordCheck) return res.status(400).send( { error: "Incorrect Password !"})

                        // create jwt token
                       const token =  jwt.sign({
                                userId : user._id,
                                username: user.username
                      }, JWT_SECRET, {expiresIn : "24h"});
                      return res.status(200).send({
                        msg: "Login Successfull...!",
                        username: user.username,
                        token,
                        id: user._id
                      });


                    } )
                    .catch( error => {
                        
                        return res.status(404).send({ error : "Password Doesn't  Match"});
                        
                    })
            }
        ).catch(error => {
            return res.status(404).send({ error : "Username Not Found"});
        }) 

    }catch(error){
        return res.status(500).send({error})
    }

    

} ;

//GET
 async function getUser(req,res)
{
    const { username } = req.params;
    try {
        if(!username) return res.status(501).send({error : "Invalid Username"});
        const user = await UserModel.findOne({username});
        if (!user) {
            return res.status(404).send({ error: "Username Not Found" });
        }

        // removing password from user
        //mongoose return unnecessary data so removing it
        const {password , ...rest} = Object.assign({},user.toJSON());
        return res.status(200).send(rest);
    } catch (error) {
        
        return res.status(404).send({error : "Cannot Find User Data"});
        
    }

} ;

 async function generateOTP(req,res)
{
    res.json('generate route');
} ;

 async function verifyOTP(req,res)
{
    res.json('verify otp route');
} ;
 async function createResetSession(req,res)
{
    res.json('reset route');

};
//PUT
async function updateUser(req, res) {
    try {
        const data = {};
        const {  profile, email, fullName, mobile, address } = req.body;
        const { username } = req.params;
        // Add fields to update object if they exist
        if (username) data.username = username;
        if (profile) data.profile = profile;
        if (email) data.email = email;
        if (fullName) data.fullName = fullName;
        if (mobile) data.mobile = mobile;
        if (address) data.address = address;

        

        // Find the user and update
        const updatedUser = await UserModel.findOneAndUpdate({username}, data, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ error: "User not found" });
        }

        // Respond with updated user data
        return res.status(200).json(updatedUser);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


 async function resetPassword(req,res)
{
    res.json('resetPassword route');

};
async function getUserProperty(req,res)
{
    const { id } = req.params;
    try {
        const existProperty = await PropertyModel.find({ ownerId:id });
        
        return res.status(200).send(existProperty);
    } catch (error) {
        
        return res.status(404).send({error : "Cannot Find Property Data"});
        
    }

} ;
async function getProperties(req,res)
{
    
    try {
        
        
        const allProperties = await PropertyModel.find().sort({_id:-1});
        return res.status(200).send(allProperties);
    } catch (error) {
        
        return res.status(404).send({error : "Cannot Find Property Data"});
        
    }

} ;
// POST Property for a specific user
async function postProperty(req, res) {
    try {
        const { id } = req.params;

        // Check if the user exists
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const {
            propertyType,
            title,
            location,
            description,
            price,
            details,
            features,
            media,
            contactInfo,
            propertyStatus,
            propertyCategory,
            additionalInfo,
        } = req.body;

        // Create a new property document
        const newProperty = new PropertyModel({
            propertyType,
            title,
            location,
            description,
            price,
            details,
            features,
            media,
            contactInfo,
            propertyStatus,
            propertyCategory,
            additionalInfo,
            ownerId: id // Associate the property with the logged-in user
        });

        // Save the property in the database
        await newProperty.save();

        // Respond with the saved property
        return res.status(201).json(newProperty);

    } catch (error) {
        console.error("Error posting property:", error);
        return res.status(500).json({ error: "Something went wrong while posting the property." });
    }
}


module.exports.register = register;
module.exports.login = login;
module.exports.getUser = getUser;
module.exports.generateOTP = generateOTP;
module.exports.verifyOTP = verifyOTP;
module.exports.createResetSession = createResetSession;
module.exports.updateUser = updateUser;
module.exports.resetPassword = resetPassword;
module.exports.verifyUser = verifyUser;
module.exports.getUserProperty = getUserProperty;
module.exports.postProperty = postProperty;
module.exports.getProperties = getProperties;
