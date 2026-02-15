const express = require('express');
const {userAuth} = require('../middlewares/auth.js')
const {validateEditProfileData, validateEditProfilePasswordData} = require("../utils/validation.js")
const bcrypt = require('bcrypt');
const User = require("../models/user")

const profileRouter=express.Router();

// To get profile of a user
profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
        const user = req.user;
            res.send(user);

    }
    catch(err){
        res.status(500).send(": "+err.message);
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
            res.status(500).send("Some Error Occurred4: "+err.message);
        }
})

profileRouter.patch('/profile/password',userAuth,async(req,res)=>{
    try{

        validateEditProfilePasswordData(req);
        const {currentPassword, newPassword} = req.body;
        const user = req.user;

        const isCurrentPasswordValid = await user.comparePasswords(currentPassword);

        if(!isCurrentPasswordValid){
            throw new Error("Current Password is not valid");
        }

        //Encrypting the new password
        const newPasswordHash = await bcrypt.hash(newPassword,10);
        
        //Updating the password in the database
        await User.updateOne({_id:user._id},{$set:{password:newPasswordHash}});
        await user.save(); //saving the instance to update the password field in the user object

        //After the password is changed, we need to log the user out
        res.cookie("token",null,{expires: new Date(0)});
        res.send("Password is updated succesfully, please login again with new password");
    }
    catch(err){
        res.status(500).send("Some error occured5: "+err.message);
    }
})

module.exports=profileRouter;