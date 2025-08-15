const express = require('express');
const {userAuth} = require('../middlewares/auth.js')

const profileRouter=express.Router();

// To get profile of a user
profileRouter.get('/profile',userAuth,async(req,res)=>{
    try{
        const user = req.user;
            res.send(user);

    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }
})

module.exports=profileRouter;