const express = require('express');
const {userAuth} = require('../middlewares/auth')
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest')
const USER_SAFE_DATA="firstName lastName photoURL age gender about skills";

// get all the pending request the user has received
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        //Virender => Sachin
        // logged in hai sachin, wo dekh rha hai ki virender interested hai
        // toh sachin accept kr lega

        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",USER_SAFE_DATA);
        //.populate("fromUserId",["firstName","lastName"]);

        res.json({message:"Data fetched Successfully!",data:connectionRequests});
    }
    catch(err){
        req.statusCode(400).send("Some Error Occured: "+err.message);
    }
});

// Will show users whose are a connection, i.e, users whose and whom connection request is accepted
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,status:"accepted"},
                {toUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
          .populate("toUserId",USER_SAFE_DATA);

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString())
            {
                return row.toUserId;
            }
            else{
                return row.fromUserId;
            }
        });

        res.json({data});
    }
    catch(err){
        res.status(500).json({message:"Some error occured: "+err.message})
    }
})

module.exports=userRouter;