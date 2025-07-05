//mongodb+srv://namastedev:rOnxOFSXhRPhhwvz@cluster0.2rkvmda.mongodb.net/
const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User=require("./models/user");

app.post('/signup',async(req,res)=>{
    // Adding a new user instance in the model

    const user = new User({
        firstName:"Sachin",
        lastName:"Tendulkar",
        email:"sachin@tendulkar.com",
        password:"sachin!"
    });

    try{
        await user.save();
        res.send("User is added into collection successfully!")
    }
    catch(err){
        res.status(500).send("Erroe faced while adding user: "+err.message);
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
