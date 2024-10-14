const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
app.use(cors());
dotenv.config({path: './config.env'});
require('./db/conn');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// const Property = require('./models/propertySchema');


const PORT = process.env.PORT || 8000;


app.use(require('./routes/authRoutes'));

 
//Middleware

const middleware = (req,res,next) => {
    
    next();
}





app.get("/",(req,res)=> {
    res.send("HI , this is homeee");
})
app.get("/about",middleware,(req,res)=> {
    res.send("HI , this is abput");
})
app.get("/api", (req,res) => {
    res.json({"users": ["userOne","userTwo","userThree"]})
})
app.get("/addData", (req,res) => {
    res.send("hjcid")
})



// const property = require('./Models/newModel');



app.listen(PORT,()=> {console.log("server stared")})