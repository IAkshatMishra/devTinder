const express = require('express');

const app =express();

app.use("/",(req,res)=>{
    res.send("Hi this is the main page!");
})

//Below is a request handler
app.use("/home",(req,res)=>{
    res.send("Welcome to home page man!");
})

app.use("/test",(req,res)=>{
    res.send("Hello World!");
})

app.listen(3000);