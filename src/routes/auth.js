const express = require('express');
const {signUpValidation} = require("../utils/validation");
const User=require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authRouter = express.Router();


//API - /signup API - to add a new user
authRouter.post('/signup',async(req,res)=>{
    try{
        //Validation for req.body
        signUpValidation(req);
        
        const {firstName,lastName,emailId,password}=req.body

        // Encryting the password
        const passwordHash = await bcrypt.hash(password,10);
        console.log("Password Hash: ",passwordHash);

        // Adding a new user instance in the model
        const user = new User({firstName,lastName,emailId,password:passwordHash});
        
        await user.save();
        res.send("User is added into collection successfully!")
    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }

});

// API to login an existing user
authRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        //Checking if the emailId even exists in the collection or not
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        //Checking if the password is correct or not
        const isValidPassword =await user.comparePasswords(password);
        if(isValidPassword){
            
            //Create a jwt token
            const token = await user.getJWT();
            //Use cookie to store token
            res.cookie("token",token,{expires: new Date(Date.now() +1000*60*60*24*7)});
            res.send("User login successful!!")
        }
        else{
            throw new Error("Invalid Credentials");
        }
    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }
})

module.exports = authRouter;