const express = require('express');

const app = express();

app.use('/',(err,req,res,next)=>{
    console.log("Error Checking1");
    if(err){
        res.status(500).send("An unexpected error occcured");
    }
})

//Error Handling
app.get("/userData",(req,res)=>{
    //try{
        //Logic to fetch user details
        throw new error("You stupiud");
        res.send("User Details are here");
    //}
    //catch(err){
    //    res.status(404).send("An error occured while fetching user details");
    //}
    
});

//Wildcard Error handling
app.use('/',(err,req,res,next)=>{
    console.log("Error Checking2");
    if(err){
        res.status(500).send("An unexpected error occcured");
    }
})


app.listen(3000);