const express = require('express');
const {userAuth} = require('../middlewares/auth.js')
const {validateEditProfileData} = require("../utils/validation.js")


const profileRouter=express.Router();

// To get profile of a user
profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
        const user = req.user;
            res.send(user);

    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }
})

profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
        //Data Santization and validation (utills/validation.js)
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request");
        };
        
        const loggedInUser = req.user;
        
        Object.keys(req.body).forEach((key)=>{loggedInUser[key] = req.body[key]});
        await loggedInUser.save();
        res.json({message:`${loggedInUser.firstName}, your profile Updated Successfully!`,data:loggedInUser});

    }
    catch(err){
            res.status(500).send("Some Error Occurred: "+err.message);
        }
})

module.exports=profileRouter;