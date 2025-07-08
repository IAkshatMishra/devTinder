//mongodb+srv://namastedev:rOnxOFSXhRPhhwvz@cluster0.2rkvmda.mongodb.net/
const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User=require("./models/user");

app.use(express.json()); // To parse JSON bodies

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
    // Adding a new user instance in the model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User is added into collection successfully!")
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
app.patch('/user',async(req,res)=>{
    const userId = req.body.userId;
    const data =req.body;
    try{
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
