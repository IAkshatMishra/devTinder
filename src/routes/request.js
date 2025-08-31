const express = require('express');
const {userAuth} = require('../middlewares/auth.js')
const ConnectionRequest = require('../models/connectionRequest.js')
const User = require("../models/user.js")

const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    try{
        res.send(req.user.firstName+" sent you a connection Request!")
    }
    catch(err){
        res.send("Some Error Occured: "+err.message)
    }
})
requestRouter.post('/send/request/:status/:toUserId',userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        //Making sure that only "interested" and "ignored" are the only status allowed
        const allowedStatus = ["interested","ignored"];
        if(!allowedStatus.includes(status))
        {
            return res.status(400).send(`${status} is not a valid status!`);
        }

        //Making sure that a person can only send only one request to toUser
        // and the toUser cannot send a request to fromUser
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},//Only one request exists from fromUser to toUser
                {fromUserId:toUserId,toUserId:fromUserId} //toUser cannot send a request to fromUser
            ],
        });

        if(existingConnectionRequest){
            return res.status(400).json({message:"Connection request already Exists!"})
        }

        // Making sure that garbage toUserId is not allowed
        //i.e, making sure the toUserId is legit
        const toUser = await User.findById({_id:toUserId});
        if(!toUser){
            return res.status(400).json({message: "User not found!"});
        }

        //To make sure that self connection request is not allowed, I'll use schema.pre("save") method 
        // Check the connectionRequest Schema for this code

        const connectionRequest = new ConnectionRequest(
            {
                fromUserId:fromUserId,
                toUserId:toUserId,
                status:status
            });
        
        const data = await connectionRequest.save();    
        
        res.json({
            message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
            data
        })
    }
    catch(err){
        res.status(400).send("Some Error Occured: "+err.message);
    }
})


module.exports = requestRouter;
