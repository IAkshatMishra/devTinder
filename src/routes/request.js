const express = require('express');
const {userAuth} = require('../middlewares/auth.js')

const requestRouter = express.Router();

requestRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    try{
        res.send(req.user.firstName+" sent you a connection Request!")
    }
    catch(err){
        res.send("Some Error Occured: "+err.message)
    }
})

module.exports = requestRouter;
