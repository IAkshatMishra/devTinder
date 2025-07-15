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
            const token = await jwt.sign({_id:user._id},"DEV@Tinder#631!")

            //Use cookie to store token
            res.cookie("token",token);
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
app.get('/profile',async(req,res)=>{
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid Token");
        }
        
        const decodedMessage = await jwt.verify(token,"DEV@Tinder#631!");

        const user =await User.findById({_id:decodedMessage._id});
        
        if(!user){
            throw new Error("User does not exist");
        }
            res.send(user);

    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }
})

app.get('/user/:id',async(req,res)=>{
    const currentId = req.params.id;

    const findUser = await User.findById({_id:currentId});
    res.send(findUser);
})

//To delete a user
app.delete('/user',async(req,res)=>{
    const userID = req.body.userId;
    try{
        await User.findByIdAndDelete({_id:userID});
        //await User.findByIdAndDelete(userID);
        res.send("User deleted Successfully!");
    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
    }
})

// To update a user
app.patch('/user/:userId',async(req,res)=>{
    const userId = req.params?.userId;
    const data =req.body;
    /*
        {
            "userId":"686c70cff508c5102088720b",
            "firstName":"Alia",
            "lastName":"Bhatt",
            "emailId":"Alsia@bhatttttttttt.com",
            "skills:":["Acting","Java","Node"],
            "xyz":"fisgfyufg"
        }
     */

    try{
        const UPDATE_ALLOWED = ["password","age","skills","photoURL","about"]
    
        const isValidUpdate = Object.keys(data).every((key)=>UPDATE_ALLOWED.includes(key)); 
        if(!isValidUpdate){
            throw new Error("These cannot be updated");
        }
        if(data?.skills.length>10){
            throw new Error("Skills cannot be more than 10");
        }
        const user=await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true // This will ensure that the validators defined in the schema are applied during the update
        });
        res.send("User updated succesfully!");
    }
    catch(err){
        res.status(500).send("Some Error Occurred: "+err.message);
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
