//mongodb+srv://namastedev:rOnxOFSXhRPhhwvz@cluster0.2rkvmda.mongodb.net/
const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User=require("./models/user");
const {signUpValidation} = require("./utils/validation");
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth.js')

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser()); // To parse cookies

//API - Get user by email
app.get("/user",async(req,res)=>{
    try{
        const userInfo = await User.find({emailId:req.body.emailId});
        
        if(userInfo.length===0){
            res.status(404).send("No user found");
        }
        else{
            res.send(userInfo);
        }
    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }
});

//API - /feed API - get all the users from the collection
app.get('/feed',async(req,res)=>{
    try{
        const allUsers = await User.find({});
        if(allUsers.length===0){
            res.status(404).send("No users found in the collection!");
        }
        else{
            res.send(allUsers);
        }
    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }

})

//API - /signup API - to add a new user
app.post('/signup',async(req,res)=>{

    
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

})


// API to login an existing user
app.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;

        //Checking if the emailId even exists in the collection or not
        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        //Checking if the password is correct or not
        const validPassword = await bcrypt.compare(password,user.password);
        if(validPassword){
            
            //Create a jwt token
            const token = await jwt.sign({_id:user._id},"DEV@Tinder#631!",{expiresIn:'7d'});//

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


// To get profile of a user
app.get('/profile',userAuth,async(req,res)=>{
    try{
        const user = req.user;
            res.send(user);

    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }
})

app.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    try{
        res.send(req.user.firstName+" sent you a connection Request!")
    }
    catch(err){
        res.send("Some Error Occured: "+err.message)
    }
})


connectDB()
.then(()=>{
    console.log("Connection to Database is established!");
    app.listen((3000),()=>{
        console.log("Server listening on port 3000")
    })
})
.catch((err)=>{
    console.log("Error encountered while connecting to the database");
})
