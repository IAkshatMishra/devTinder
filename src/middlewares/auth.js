const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth= async(req,res,next)=>{
    try{
        const cookies = req.cookies;
        const {token}=cookies;
        if(!token){
            return res.status(401).send("Please Login!")
            //throw new Error ("Token not valid!");
        }

        const decodedObj = await jwt.verify(token,"DEV@Tinder#631!");    
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("Not a valid user")
        }
        //console.log(user);
        req.user= user;
        next();
    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }
}

module.exports ={userAuth};