const express= require('express'); // import express js
const admin_user = require('../../Models/Admin/admin-auth'); // import admin-auth-schema model
const  router = express.Router(); // import router express to take a paths
const bcrypt = require('bcryptjs'); //import bcrypt js to protect password
var jwt = require('jsonwebtoken');  //import json web token
const { body, validationResult } = require('express-validator'); //import express validator to checks the endpoints.



//Router 1) Create a admin-user using post request:
 router.post('/signup',[
    // Enter a valid email
    body('Email','Enter a valid email').isEmail(),

    // Password must be at least 3 chars long
    body('Password','Password must be atleast 3 charaters long').isLength({ min: 3 }),
] , async (req,res) =>{
     let success = false;
 // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   // IF there are errors, sending bad request
     if (!errors.isEmpty()) {
     return res.status(400).json({success, errors: errors.array() });
 }
 try {
   //To check the user that this email alreday exists or not.
 let user = await admin_user.findOne({Email:req.body.Email});
 if (user) { //if users already exits sending bad request
   return res.status(400).json({success,error: "Sorry this Email already exists"});
 }
 // addign a bcrypt salt to protect users passwords
 const webtoken = '554$0@32'
 const salt = await bcrypt.genSalt(10); //Generating a password hash
 const secpass = await bcrypt.hash(req.body.Password,salt)
  user = await admin_user.create({
   Email: req.body.Email,
   Password: secpass,
 })
 const data = {
   user :{
     id: user.id
   }
 } 
 console.log(data)
 const authtoken = jwt.sign(data,webtoken,{ noTimestamp:true, expiresIn: '24h'});
 success = true;
 res.json({success,authtoken})
 } catch (error) {
   console.error(error.message)
   res.status(500).send('Internal Server Error')
 }
 })

 module.exports = router;