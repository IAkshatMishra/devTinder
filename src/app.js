const express = require('express');

const app = express();

//Writing a middleware to actually check if the admin is authorized
const {isAdmin,isUser} = require("./middlewares/auth.js");

app.use("/admin", isAdmin);

app.post("/user/login",(req,res)=>{
    res.send("User data is sent");
})

app.get("/user/data",isUser,(req,res)=>{
    res.send("You are a valid User");
});

app.get("/admin/getAllData",(req,res)=>{
        res.send("All Data is Sent!!")
});

app.get("/admin/deleteAUser",(req, res) => {
        res.send("A user is deleted by admin!!");
})


app.listen(3000);