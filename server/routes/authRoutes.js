const express = require('express');
const router = express.Router();

const controller = require('../controllers/appController.js')

//GET
router.get("/",(req,res)=> {
    res.send("HI , this is from router");
});

router.get("/user/:username", controller.getUser);
router.get("/generateOTP", controller.generateOTP);
router.get("/verifyOTP",controller.verifyOTP);
router.get("/createResetSession",controller.createResetSession);

//POST
router.post('/register', controller.register);
// router.post('/registerMail',(req,res) => {
//     res.json('register json')
// })
router.post('/authenticate',(req,res) => {
    res.end()
});
router.post('/login',controller.login);

//PUT

router.put('/updateuser/:username',controller.updateUser)
router.put('/resetPassword',controller.resetPassword)


// GET Property

router.get('/getProperties',controller.getProperties)
router.get('/getUserProperty/:id',controller.getUserProperty)
// POST Property
router.post('/postProperty/:id',controller.postProperty)

module.exports = router;